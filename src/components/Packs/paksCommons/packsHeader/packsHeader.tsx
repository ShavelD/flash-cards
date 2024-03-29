import React from 'react'
import style from './PacksHeader.module.css'
import {CardsSlider} from "../cardsSlider/CardsSlider";
import {ClearFilterButton} from "../filterButton/clearFilterButton";
import {Searching} from "../searching/Searching";
import {ShowPacksCards} from "../showPacksCards/showPacksCards";
import useModal from "../../../../hooks/useModal";
import {AddNewPackModal} from "../../../Modals/Add New Pack Modal/AddNewPackModal";


export const PacksHeader = () => {

    const { itemModalOpen, toggle } = useModal()

    const clearParams = ['page', 'user_id', 'min', 'max', 'sortPacks', 'pageCount'];

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
                <button className={style.button} onClick={toggle}>Add new pack</button>
                <AddNewPackModal open={itemModalOpen} hide={toggle} />
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