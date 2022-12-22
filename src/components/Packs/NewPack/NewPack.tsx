import * as React from 'react'
import {useAppDispatch} from "../../../hooks/hook";
import style from "./NewPack.module.css"
import {NavLink} from "react-router-dom";
import {ROUTS} from "../../../App";
import {KeyboardBackspace} from "@mui/icons-material";
import {createPackTC} from "../../../redux/main-reducer";


export const NewPack = () => {
    const dispatch = useAppDispatch()


    const handleAddNewPack = () => {
        dispatch(createPackTC())
    }

    return (
        <div className={style.container}>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <h2 className={style.title}>
                Name Pack
            </h2>
            <div className={style.textEmpty}>This pack is empty. Click add new card to fill this pack</div>
            <div className={style.divButton}>
                <button className={style.button} onClick={handleAddNewPack}>
                    Add new pack
                </button>
            </div>
        </div>

    )
}