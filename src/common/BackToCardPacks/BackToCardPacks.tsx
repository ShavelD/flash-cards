import {NavLink} from "react-router-dom";
import {ROUTS} from "../../App";
import style from "../../components/Profile/Profile.module.css";
import {KeyboardBackspace} from "@mui/icons-material";
import React from "react";

export const BackToCardPacks = () => {
    return (
        <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
            <div className={style.text}>Back to Packs List</div>
        </NavLink>
        </div>
    )
}