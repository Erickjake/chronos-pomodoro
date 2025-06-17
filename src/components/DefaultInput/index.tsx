import style from './style.module.css'

type DefaultInputProps = {
    id: string;
    labelText: string;
} & React.ComponentProps<'input'>;

export default function DefaultInput({ labelText, type, id, ...rest }: DefaultInputProps) {

    return (
        <>
            <label htmlFor={id}>{labelText} </label>
            <input className={style.input} id={id} type={type} {...rest} />
        </>
    );
}