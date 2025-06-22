import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultButton from "../DefaultButton";
import Cycles from "../Cycles";
import DefaultInput from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import useTaskContext from "../../contexts/TaskContext/useTaskContext";



export default function MainForm() {
    const { state, dispatch } = useTaskContext()
    const taskNameInput = useRef<HTMLInputElement>(null)

    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle)

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert('Digite o nome da tarefa')
            return
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        }

        dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });

    }

    function handleInterruptTask() {
        dispatch({
            type: TaskActionsTypes.INTERRUPT_TASK
        });
    }

    return (
        <form onSubmit={handleCreateNewTask} action="" className="form">
            <div className="formRow">
                <DefaultInput ref={taskNameInput} placeholder='Digite Algo' id='meuInput' labelText='Task' type='text' disabled={!!state.activeTask} />

            </div>
            <div className="formRow">

                <Tips />

            </div>

            {state.currentCycle > 0 && (
                <div className="formRow">
                    <Cycles />
                </div>
            )}

            <div className="formRow">
                {!state.activeTask && (
                    <DefaultButton
                        aria-label="Interromper tarefa"
                        title="Interromper tarefa"
                        type="submit"
                        key='botao_submit'
                        icon={<PlayCircleIcon />} />

                )} {state.activeTask && (
                    <DefaultButton
                        aria-label="Iniciar tarefa"
                        title="Iniciar tarefa"
                        color="red"
                        type="button"
                        key='botao_button'
                        onClick={handleInterruptTask}
                        icon={<StopCircleIcon />}
                    />)}
            </div>
        </form>)
}