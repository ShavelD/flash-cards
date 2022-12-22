import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {registrationTC} from "../../redux/auth-reducer";
import {RegistrationForm} from "./RegistrationForm";
import style from "../../components/Login/LoginForm.module.css";
import {RegisterPopsType} from "../../api/auth-api";
//import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
//import {registrationThunk} from "../store/thunk/thunk";


export type FormDataType = {
    email: string
    password: string
}


export const Registration = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const storeEmail = useAppSelector(state => state.auth.registration)

    const onClickHandler = (model: RegisterPopsType) => {
        dispatch(registrationTC(model))
    }

    useEffect(()=>{
        if(storeEmail)
            navigate('/login')
    }, [storeEmail])

    return (
        <div className={style.registration}>
            <RegistrationForm onClickHandler={onClickHandler}/>
        </div>
    );
};

