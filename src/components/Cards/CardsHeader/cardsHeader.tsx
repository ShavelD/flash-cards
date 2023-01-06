import * as React from 'react'
import style from "../../Packs/paksCommons/packsHeader/PacksHeader.module.css";
import {ROUTS} from "../../../App";
import {Searching} from "../../Packs/paksCommons/searching/Searching";
import {NavLink, useNavigate} from "react-router-dom";
import {KeyboardBackspace} from "@mui/icons-material";


export const CardsHeadMain = () => {
    const navigate = useNavigate()

    const onClickHandlerAddNewPack = () => {
        return navigate(ROUTS.ADD_NEW_CARD)
    }

    return (
        <div className={style.container}>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <div className={style.firstSection}>
                <h2 className={style.title}>Packs list</h2>
            </div>
            <div className={style.secondSection}>
                <Searching search='cardQuestion'/>
            </div>
        </div>
    )
}