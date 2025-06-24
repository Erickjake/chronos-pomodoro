import { RouterLink } from '../RouterLink'
import styles from './style.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <RouterLink href="/About">Entenda como funciona a técnica pomodoro 🍅</RouterLink>
            <RouterLink href="/">Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚</RouterLink>
        </footer>
    )
}