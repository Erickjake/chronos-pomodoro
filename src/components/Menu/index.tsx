import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './style.module.css'
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'light' | 'dark';
export function Menu() {

    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
        return storageTheme;
    });
    function handleClickTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,) {
        event.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });

    }
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink href="/" aria-label='Ir para a Home' title='Ir para a Home' className={styles.menuLink}>
                <HouseIcon />
            </RouterLink>
            <RouterLink href="/History" aria-label='Ver Historico' title='Ver Historico' className={styles.menuLink}>
                <HistoryIcon />
            </RouterLink>
            <RouterLink href="/Settings" aria-label='Configuracoes' title='Configuracoes' className={styles.menuLink}>

                <SettingsIcon />
            </RouterLink>
            <RouterLink href="/" aria-label='Alterar Tema' title='Alterar Tema' className={styles.menuLink} onClick={handleClickTheme}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </RouterLink>
        </nav >
    );
}
