import React, {useState} from 'react'
import s from './Profile.module.css'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {UpdateUserType} from "../../api/profile-api";
import {useAppDispatch} from "../../hooks/hook";
import {updateUserTC} from "../../redux/profile-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ProfileType} from "../../api/auth-api";


export const Profile = () => {
    const user = useSelector<AppRootStateType, ProfileType>(state => state.profile.user)
    const dispatch= useAppDispatch()

const updateUserHandler = (data:UpdateUserType) => {
        //debugger
        dispatch(updateUserTC(data))
}

    return (
        <div className={s.container}>
            <div><a href="">Back to Packs List</a></div>
            <div className={s.profile}>
                <h2>Personal Information</h2>
                <div><img src="" alt=""/></div>

                {/*<input/>*/}
                <EditableSpan onChange={updateUserHandler} name={user.name}/>

                <button className={s.button}>Log out</button>
            </div>
        </div>
    )
}