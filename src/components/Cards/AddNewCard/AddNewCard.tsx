import * as React from 'react'
import {useAppDispatch} from "../../../hooks/hook";
import style from "./AddNewCard.module.css"
import {NavLink} from "react-router-dom";
import {ROUTS} from "../../../App";
import {KeyboardBackspace} from "@mui/icons-material";
import {addPackTC} from "../../../redux/main-reducer";
import {ChangeEvent, useState} from "react";
import {addCardTC} from "../../../redux/cards-reducer";


export const AddNewCard = () => {
    const dispatch = useAppDispatch()

    const [packName, setPackName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)


    const addNewCardHandler = () => {
        // dispatch(addCardTC({ cardsPack: { name: packName, private: isPrivate } }))
        // alert(JSON.stringify("Колода добавилась " + new Date()))
    }

    // const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPackName(e.currentTarget.value)
    // }
    // const setPrivatePack = (e: ChangeEvent<HTMLInputElement>) => {
    //     setIsPrivate(e.currentTarget.checked)
    // }

    return (
        <div className={style.container}>
            <div><NavLink to={ROUTS.CARDS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Cards List</div>
            </NavLink>
            </div>
            <h2 className={style.title}>
                Name Card
            </h2>
            <div className={style.textEmpty}>This pack is empty. Click add new card to fill this pack</div>
            <div className={style.divButton}>
                <button className={style.button} onClick={addNewCardHandler}>
                    Add new card
                </button>
            </div>
        </div>

    )
}