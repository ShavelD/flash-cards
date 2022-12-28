import React from 'react'
import style from './PacksHeader.module.css'
import {CardsSlider} from "../cardsSlider/CardsSlider";
import {ClearFilterButton} from "../filterButton/clearFilterButton";
import {Searching} from "../searching/Searching";
import {ShowPacksCards} from "../showPacksCards/showPacksCards";
import {ROUTS} from "../../../../App";
import {useNavigate} from "react-router-dom";
import {NewPack} from "../../NewPack/NewPack";


export const PacksHeader = () => {

    const navigate = useNavigate()

    const onClickHandlerAddNewPack = () => {
        return navigate(ROUTS.ADD_NEW_PACK)
    }

    const clearParams = ['page', 'user_id', 'min', 'max', 'sortPacks', 'pageCount'];

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
                <button type="submit" className={style.button} onClick={onClickHandlerAddNewPack}>Add new pack</button>
            </div>
            <div className={style.secondSection}>
                <Searching search="packName"/>
                <ShowPacksCards/>
                <CardsSlider/>
                <ClearFilterButton params={clearParams}/>
            </div>
        </div>
    )
}