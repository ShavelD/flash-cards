import * as React from 'react'
import {useAppDispatch} from "../../../hooks/hook";
import style from "./NewPack.module.css"
import {addPackTC} from "../../../redux/main-reducer";
import {useState} from "react";
import {BackToCardPacks} from "../../../common/BackToCardPacks/BackToCardPacks";


export const NewPack = () => {
    const dispatch = useAppDispatch()

    const [packName, setPackName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)


    const addNewPackHandler = () => {
        dispatch(addPackTC({ cardsPack: { name: packName, private: isPrivate } }))
        alert(JSON.stringify("Колода добавилась " + new Date()))
    }

    return (
        <div className={style.container}>
            <BackToCardPacks/>
            <h2 className={style.title}>
                Name Pack
            </h2>
            <div className={style.textEmpty}>This pack is empty. Click add new card to fill this pack</div>
            <div className={style.divButton}>
                <button className={style.button} onClick={addNewPackHandler}>
                    Add new pack
                </button>
            </div>
        </div>

    )
}