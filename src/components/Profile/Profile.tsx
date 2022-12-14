import React, {useState} from 'react'
import s from './Profile.module.css'
import {SuperInputText} from "../../common/SuperInput/SuperInput";


export const Profile = () => {

    const [name, setName] = useState<string>('')



    return (
        <div className={s.profile}>
            <div><a href="">Back to Packs List</a></div>
            <h2>Personal Information</h2>
            <div><img src="" alt=""/></div>
            <SuperInputText/>
            <button>Log out</button>
        </div>
    )
}