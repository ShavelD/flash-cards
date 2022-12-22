import React from 'react'
import Button from '@mui/material/Button'
import style from './PacksHeader.module.css'
import {CardsSlider} from "../cardsSlider/CardsSlider";
import {FilterButton} from "../filterButton/filterButton";
import {Searching} from "../searching/Searching";
import {ShowPacksCards} from "../showPacksCards/showPacksCards";
import {ROUTS} from "../../../../App";


export const PacksHeader = () => {

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
                <Button className={style.button} href={ROUTS.ADD_NEW_PACK}>
                    Add new pack
                </Button>
            </div>

            <div className={style.secondSection}>
                <Searching/>
                <ShowPacksCards/>
                <CardsSlider/>
                <FilterButton/>
            </div>
        </div>
    )
}