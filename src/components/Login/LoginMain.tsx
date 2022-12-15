import React from 'react';
import style from './LoginForm.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {loginTC} from "../../redux/auth-reducer";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const isLoggedIh = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIh)

    const dispatch = useAppDispatch()

    const onHandlerSubmit = (formData: FormDataType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe));

    }
        return (

            <div className={style.login}>
                {isLoggedIh ? <Navigate to={"/profile/"}/>
                    : <>
                        <LoginForm onHandlerSubmit={onHandlerSubmit}/>
                    </>
                }
            </div>
)
}