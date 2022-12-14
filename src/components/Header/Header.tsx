import React from 'react';
import logo from '../../assets/images/logo.png'
import style from './Header.module.css';


export const Header = () => {

    const onClickHandler = () => {
    }

    return (
        <div className={style.wrapper}>
            <div>
                <img src={logo}/>
            </div>
            <div>
                <button onClick={onClickHandler} className={style.button} >
                    Sign in
                </button>
            </div>
        </div>
    );
};

