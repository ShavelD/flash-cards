import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hook";
import style from "./EmailConfirmation.module.css"
import Group from "../../assets/images/Group 281.png"



const EmailConfirmation = () => {
    const navigate = useNavigate()
    const storeEmail = useAppSelector(state => state.auth.email)

    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <h2 className={style.CheckMail}>Check Email</h2>
                <div className={style.group}><img src={Group} alt={''}/> </div>
                <p>We have sent an Email with instructions to {storeEmail}</p>
                <div className={style.wrapperButton}><button onClick={()=>navigate('/login')}
                   >Back to login</button> </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;