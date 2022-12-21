import React from 'react';
import logo from '../../assets/images/logo.png'
import Avatar from '../../assets/images/Avatar.jpg'
import s from './Header.module.css';
import {useAppSelector} from "../../hooks/hook";


export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const name = useAppSelector(state => state.profile.name)

    const onShowAvaHandler = () => {
    }

    return (
        <div className={s.wrapper}>
            <div>
                <img src={logo}/>
            </div>
            {isLoggedIn ? (
                <div className={s.userBlock} onClick={onShowAvaHandler}>
                    <div className={s.userName}>{name}</div>
                    <div className={s.widthImg}><img className={s.widthImg}src={Avatar}/></div>
                </div>
            ) : <button className={s.button}>Sign In</button>}
        </div>
    );
};

