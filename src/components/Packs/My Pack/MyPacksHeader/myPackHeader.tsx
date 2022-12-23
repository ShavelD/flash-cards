import style from "./myPacksHeader.module.css";
import Button from "@mui/material/Button";
import {ROUTS} from "../../../../App";
import {Searching} from "../../paksCommons/searching/Searching";
import {ShowPacksCards} from "../../paksCommons/showPacksCards/showPacksCards";
import {CardsSlider} from "../../paksCommons/cardsSlider/CardsSlider";
import {FilterButton} from "../../paksCommons/filterButton/filterButton";
import React from "react";




export const MyPacksHeader = () => {

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Friend’s Pack</h2>
                <Button className={style.button} href={ROUTS.ADD_NEW_PACK}>
                    Learn to pack
                </Button>
            </div>

            <div className={style.secondSection}>
                {/*<Searching/>*/}
                <ShowPacksCards/>
                <CardsSlider/>
                <FilterButton/>
            </div>
        </div>
    )
}