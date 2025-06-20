import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultButton from "../DefaultButton";
import Cycles from "../Cycles";
import DefaultInput from "../DefaultInput";
import { useEffect, useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import useTaskContext from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsTominutes } from "../../utils/formatSecondsToMinutes";


export default function MainForm() {
    const { state, setState } = useTaskContext()
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

        const secondsRemaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                config: { ...prevState.config },
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsTominutes(secondsRemaining),
                tasks: [...prevState.tasks, newTask],
            }
        })
    }
    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <form onSubmit={handleCreateNewTask} action="" className="form">
            <div className="formRow">
                <DefaultInput ref={taskNameInput} placeholder='Digite Algo' id='meuInput' labelText='Task' type='text' disabled={!!state.activeTask} />

            </div>
            <div className="formRow">
                <p>
                    Lorem ipsum dolor sit amet.
                </p>
            </div>

            {state.currentCycle > 0 && (
                <div className="formRow">
                    <Cycles />
                </div>
            )}

            <div className="formRow">
                {!state.activeTask ? (
                    <DefaultButton
                        aria-label="Interromper tarefa"
                        title="Interromper tarefa"
                        type="submit"
                        icon={<PlayCircleIcon />} />
                ) : (<DefaultButton
                    aria-label="Iniciar tarefa"
                    title="Iniciar tarefa"
                    color="red"
                    type="button"
                    icon={<StopCircleIcon />}
                />)}
            </div>
        </form>)
}