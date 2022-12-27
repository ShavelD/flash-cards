import * as React from 'react'
import style from "../../Packs/paksCommons/packsHeader/PacksHeader.module.css";
import Button from "@mui/material/Button";
import {ROUTS} from "../../../App";
import {Searching} from "../../Packs/paksCommons/searching/Searching";



export const CardsHeadMain = () => {

    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
                <Button className={style.button} href={ROUTS.ADD_NEW_PACK}>
                    Add new pack
                </Button>
            </div>

            <div className={style.secondSection}>
                <Searching search='cardQuestion'/>
            </div>
        </div>
    )
}