import React, {useState} from 'react'
import s from './Profile.module.css'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {useAppDispatch} from "../../hooks/hook";
import {updateUserTC} from "../../redux/profile-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {MePropsType, UpdateUserType} from "../../api/auth-api";


export const Profile = () => {
    const user = useSelector<AppRootStateType, MePropsType>(state => state.profile.user)
    const dispatch = useAppDispatch()

    const updateUserHandler = (data: UpdateUserType) => {
        //debugger
        dispatch(updateUserTC(data))
    }

    // const onClickLogout = () => {
    //     dispatch(logOutTC())
    // }
    // onClickLogout={onClickLogout}

    return (
        <div className={s.container}>
            <div><a href="">Back to Packs List</a></div>
            <div className={s.profile}>
                <h2>Personal Information</h2>
                <div><img src="" alt=""/></div>

                {/*<input/>*/}
                <EditableSpan updateUserName={updateUserHandler} name={user.name}/>

                <button className={s.button}>Log out</button>
            </div>
        </div>
    )
}