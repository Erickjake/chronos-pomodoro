import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import MainTemplate from "../../templates/MainTemplate";
import useTaskContext from "../../contexts/TaskContext/useTaskContext";
import { useEffect, useRef } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";

export default function Settings() {
    const { state, dispatch } = useTaskContext();
    const workTimeInput = useRef<HTMLInputElement>(null);
    const shortBreakTimeInput = useRef<HTMLInputElement>(null);
    const longBreakTimeInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = 'Configurações - Chronos Pomodoro';
    }, [])
    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        showMessage.dismiss()

        const formErrors = []

        const workTime = Number(workTimeInput.current?.value)
        const shortBreakTime = Number(shortBreakTimeInput.current?.value)
        const longBreakTime = Number(longBreakTimeInput.current?.value)

        // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
        if (isNaN(workTime) || isNaN(shortBreakTime)
            // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
            || isNaN(longBreakTime)) {
            formErrors.push('Preencha os campos apenas com numeros')
        }

        if (workTime < 1 || workTime > 99) {
            formErrors.push('Digite apenas valores entre 1 e 99 para Foco!')
        }
        if (shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('Digite valores entre 1 e 30 para Descanso Curto!')
        }
        if (longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('Digite valores entre 1 e 60 para Descanso Longo!')
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error)
            });
            return
        }

        dispatch({
            type: TaskActionsTypes.CHANGE_SETTINGS,
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime
            }
        })
        showMessage.sucess('Configurações salvas com sucesso!')

    }
    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>
            <Container>
                <p style={{ textAlign: 'center' }}> Modifique as configurações para tempo de foco, descanso curso e
                    descanso longo. </p>
            </Container>
            <Container>
                <form onSubmit={handleSaveSettings} action="" className="form">
                    <div className="formRow">
                        <DefaultInput type="number" id='workTime' labelText='Foco' ref={workTimeInput} defaultValue={state.config.workTime} />
                    </div>
                    <div className="formRow">
                        <DefaultInput type="number" id='shortBreakTime' labelText='Descanso Curto' ref={shortBreakTimeInput} defaultValue={state.config.shortBreakTime} />
                    </div>
                    <div className="formRow">
                        <DefaultInput type="number" id='longBreakTime' labelText='Descanso Longo' ref={longBreakTimeInput} defaultValue={state.config.longBreakTime} />
                    </div>
                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon />}
                            aria-label="Salvar Configurações"
                            title="Salvar Configurações" />
                    </div>
                </form>
            </Container>
        </MainTemplate>

    )
}