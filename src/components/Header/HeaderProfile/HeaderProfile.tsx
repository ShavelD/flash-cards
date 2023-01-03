import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './HeaderProfile.module.css'
import {useAppDispatch} from "../../../hooks/hook";
import {logOutTC} from "../../../redux/auth-reducer";

type HeaderProfileType = {
    onHidden: () => void
}

export const HeaderProfile = (props: HeaderProfileType) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        props.onHidden()
        dispatch(logOutTC())
    }
    const toProfileHandler = () => {
        props.onHidden()
        navigate('/profile')
    }
    const onLeave = () => {
        props.onHidden()
    }

    return (
        <div className={s.wrapper} onMouseLeave={onLeave}>
            <div className={s.block} onClick={toProfileHandler}>
                <span className={s.profile}></span>
                Profile
            </div>
            <div className={s.block_two} onClick={logOutHandler}>
                <span className={s.logOut}></span>
                Log out
            </div>
        </div>
    )
}
