import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {ROUTS} from "../../App";
import {registrationTC} from "../../redux/auth-reducer";
//import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
//import {registrationThunk} from "../store/thunk/thunk";

export const Registration = () => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const storeEmail = useAppSelector(state => state.auth.email)
    const onClickHandler = async () => {
        dispatch(registrationTC(email, password))

    }
    useEffect(()=>{
        if(storeEmail)
            navigate('/email_confirmation')
    }, [storeEmail])
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: '100vh'}}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: '3px solid black', borderRadius: '15px'}}>
                <div><input value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/></div>
                <div><input value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/></div>
                <button onClick={onClickHandler}>Send</button>
                <div style={{display: "flex", justifyContent: "right"}}>
                    <span>Have an account? <NavLink to={ROUTS.LOGIN}>Login</NavLink></span></div>
            </div>
        </div>
    );
};

export default Registration;