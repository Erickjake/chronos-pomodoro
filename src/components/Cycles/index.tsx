import style from './style.module.css';
export default function Cycles() {
    return (
        <div className={style.cycles}>
            <span>Ciclos:</span>
            <div className={style.cycleDots}>
                <span className={`${style.cycleDot} ${style.workTime}`} />
                <span className={`${style.cycleDot} ${style.shortBreakTime}`} />
                <span className={`${style.cycleDot} ${style.workTime}`} />
                <span className={`${style.cycleDot} ${style.shortBreakTime}`} />
                <span className={`${style.cycleDot} ${style.workTime}`} />
                <span className={`${style.cycleDot} ${style.shortBreakTime}`} />
                <span className={`${style.cycleDot} ${style.workTime}`} />
                <span className={`${style.cycleDot} ${style.longBreaktime}`} />
            </div>
        </div>
    );
}