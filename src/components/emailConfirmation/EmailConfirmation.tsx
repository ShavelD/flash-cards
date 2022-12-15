import React from 'react';
//import {useAppSelector} from "../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hook";

const EmailConfirmation = () => {
    const navigate = useNavigate()
    const storeEmail = useAppSelector(state => state.auth.email)
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{flexDirection: "column", marginTop: '100px', width: '350px', height: '350px', border: '1px solid black', borderRadius: '2px', display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <h2>Check Email</h2>
                <img/>
                <p style={{color: "gray", fontSize: 14}}>We have sent an Email with instructions to {storeEmail}</p>
                <button onClick={()=>navigate('/login')} style={{backgroundColor: "blue", color: "white", borderRadius: '20px',
                    width: '80%', height: '40px'}}>Back to login</button>
            </div>
        </div>
    );
};

export default EmailConfirmation;