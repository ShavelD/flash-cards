import * as React from 'react'
import style from "../../Packs/paksCommons/packsHeader/PacksHeader.module.css";
import {ROUTS} from "../../../App";
import {Searching} from "../../Packs/paksCommons/searching/Searching";
import {NavLink, useNavigate} from "react-router-dom";
import {KeyboardBackspace} from "@mui/icons-material";
import {HeaderTitle} from "./CardHeaderTitle";



export const CardsHeadMain = () => {

    return (
        <div className={style.container}>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <div className={style.firstSection}>
                <HeaderTitle />
            </div>
            <div className={style.secondSectionCardsHead}>
                <Searching search='cardQuestion'/>
            </div>
        </div>
    )
}