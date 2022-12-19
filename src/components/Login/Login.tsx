import React from 'react';
import style from './LoginForm.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {LoginForm} from "./LoginForm";


export const Login = () => {

    const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.login}>
            <LoginForm  />
        </div>
    )
}