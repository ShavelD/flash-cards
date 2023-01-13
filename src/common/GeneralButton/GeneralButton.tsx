import React from 'react';
import style from './GeneralButton.module.css';
import {ReturnComponentType} from "../Types/ReturnComponentType";


type PropsType = {
    label: string;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export const GeneralButton: React.FC<PropsType> = React.memo(
    ({ label, disabled, onClick, type}): ReturnComponentType => {
        return (
            <button
                className={style.generalButton}
                type={type || undefined}
                disabled={disabled}
                onClick={onClick || undefined}
            >
                {label}
            </button>
        );
    },
);