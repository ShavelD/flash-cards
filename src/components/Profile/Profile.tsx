import React, {useState} from 'react'
import s from './Profile.module.css'


export const Profile = () => {

    const [name, setName] = useState<string>('')


    return (
        <div className={s.container}>
            <div><a href="">Back to Packs List</a></div>
            <div className={s.profile}>
                <h2>Personal Information</h2>
                <div><img src="" alt=""/></div>
                <input/>
                <button className={s.button}>Log out</button>
            </div>
        </div>
    )
}