import React from 'react'

import style from './CardHeaderTitle.module.css'

import {useAppSelector} from "../../../hooks/hook";
import {AddCardModal} from '../../Modals/Add Card/AddCard';
import {MyCardMenu} from "./MyCardMenu/MyCardMenu";
import {ROUTS} from "../../../App";
import {NavLink} from "react-router-dom";


export const HeaderTitle = () => {
    const profileId = useAppSelector(state => state.cars.packUserId)
    const myId = useAppSelector(state => state.profile._id)
    const namePacs = useAppSelector(state => state.cars.packName)


    return (
        <div className={style.containerHeaderTitle}>
            <div className={style.title}>
                <div style={{color: "purple"}}>{namePacs}</div>
                {myId === profileId && <MyCardMenu/>}
            </div>
            {myId === profileId ? (
                <AddCardModal/>
            ) : (
                <>
                    <NavLink to={ROUTS.LEARN_PACKS}>
                        <button className={style.headerTitleButton}>
                            Learn to pack
                        </button>
                    </NavLink>
                </>
            )}
        </div>
    )
}
