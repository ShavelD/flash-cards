import * as React from 'react'
import {useAppDispatch} from "../../../hooks/hook";
import style from "./AddNewCard.module.css"
import {NavLink, useParams} from "react-router-dom";
import {ROUTS} from "../../../App";
import {KeyboardBackspace} from "@mui/icons-material";
import {ChangeEvent, FC, useState} from "react";
import {addCardTC} from "../../../redux/cards-reducer";

type CardsModalType = {
    titleName?: string
    id_pack: string
    open?: boolean
    hide?: () => void
    id_card?: string
    cardQuestion?: string
    cardAnswer?: string
}

export const AddNewCard: FC<CardsModalType> = ({id_pack}) => {
    const dispatch = useAppDispatch()

    const [packName, setPackName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)


    const addNewCardHandler = () => {
        dispatch(addCardTC({cardsPack_id: id_pack}))
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
