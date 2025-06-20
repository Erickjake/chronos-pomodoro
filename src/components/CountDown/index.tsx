import useTaskContext from '../../contexts/TaskContext/useTaskContext';
import styles from './style.module.css'
// Update the import path below to the correct file that exports useTaskContext

export function CountDown() {
    const { state } = useTaskContext()

    return (
        <div className={styles.container}>
            {state.formattedSecondsRemaining}
        </div>
    );
}