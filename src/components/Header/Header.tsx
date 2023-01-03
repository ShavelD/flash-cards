import React, {useState} from 'react';
import logo from '../../assets/images/logo.png'
import Avatar from '../../assets/images/Avatar.jpg'
import s from './Header.module.css';
import {useAppSelector} from "../../hooks/hook";
import {useNavigate} from "react-router-dom";
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";


export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const name = useAppSelector(state => state.profile.name)

    let [isHidden, setIsHidden] = useState(true)

    const onShowAvaHandler = () => {
        setIsHidden(!isHidden)
    }

    const navigate = useNavigate()

    const onClickSignIn = () => {
        return navigate('/login')
    }

    return (
        <div className={s.wrapper}>
            <div>
                <img src={logo}/>
            </div>
            {isLoggedIn ? (
                <div className={s.userBlock} onClick={onShowAvaHandler}>
                    <div className={s.userName}>{name}</div>
                    <div className={s.widthImg}><img className={s.widthImg} src={Avatar}/></div>
                </div>
            ) : <button className={s.button} onClick={onClickSignIn}>Sign In</button>}
            {isHidden ? null : <HeaderProfile onHidden={onShowAvaHandler} />}
        </div>
    );
};

