import style from './style.module.css'

type GenericHtmlProps = {
    children: React.ReactNode
}

export default function GenericHtml({ children }: GenericHtmlProps) {
    return (
        <div className={style.genericHtml}>
            {children}
        </div>
    )
}