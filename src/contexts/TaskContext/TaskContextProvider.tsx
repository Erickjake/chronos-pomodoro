
import { useEffect, useReducer, useRef } from "react";
import { initialState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../components/workers/TimerWorkerManager";
import { TaskActionsTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";




type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialState, () => {
        const storageState = localStorage.getItem('state');

        if (storageState === null) return initialState;

        const parsedStotageState = JSON.parse(storageState);
        return {
            ...parsedStotageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });


    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);


    const worker = TimerWorkerManager.getInstance();


    worker.onmessage(e => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
            dispatch({
                type: TaskActionsTypes.COMPLETED_TASK
            })
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionsTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            })
        }
    })

    useEffect(() => {

        localStorage.setItem('state', JSON.stringify(state));
        if (!state.activeTask) {
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - ${state.activeTask ? state.activeTask.name : 'Timer'}`;
        worker.postMessage(state)
    }, [worker, state])


    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        }
        else {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);


    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
