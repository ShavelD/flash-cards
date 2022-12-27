import * as React from 'react'
import style from "../../Packs/paksCommons/packsHeader/PacksHeader.module.css";
import Button from "@mui/material/Button";
import {ROUTS} from "../../../App";
import {Searching} from "../../Packs/paksCommons/searching/Searching";
import {useNavigate} from "react-router-dom";



export const CardsHeadMain = () => {
    const navigate = useNavigate()

    const onClickHandlerAddNewPack = () => {
        return navigate(ROUTS.ADD_NEW_PACK)
    }

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
                <button type="submit" className={style.button} onClick={onClickHandlerAddNewPack}>Add new pack</button>
            </div>
            <div className={style.secondSection}>
                <Searching search='cardQuestion'/>
            </div>
        </div>
    )
}