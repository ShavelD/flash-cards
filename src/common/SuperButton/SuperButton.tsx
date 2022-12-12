import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    defclass?: string
}

export const SuperButton: React.FC<ButtonPropsType> = (
    {
        defclass,
        className,
        disabled,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${s.button} ${defclass === 'red' ? s.red : defclass === 'secondary' ? s.secondary : s.default}
${defclass === 'disabled' ? s.disabled : ''}${className ? className : ''}
`;

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

