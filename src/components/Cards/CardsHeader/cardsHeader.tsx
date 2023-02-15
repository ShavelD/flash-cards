import * as React from 'react'
import style from "../../Packs/paksCommons/packsHeader/PacksHeader.module.css";
import {Searching} from "../../Packs/paksCommons/searching/Searching";
import {HeaderTitle} from "./CardHeaderTitle";
import {BackToCardPacks} from "../../../common/BackToCardPacks/BackToCardPacks";


export const CardsHeadMain = () => {

    return (
        <div className={style.container}>
            <div className={style.backToCardPacks}>
                <BackToCardPacks/>
            </div>
            <div className={style.firstSection}>
                <HeaderTitle/>
            </div>
            <div className={style.secondSectionCardsHead}>
                <Searching search='cardQuestion'/>
            </div>
        </div>
    )
}