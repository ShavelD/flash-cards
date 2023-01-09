import React from 'react'

import style from './CardHeaderTitle.module.css'

import {useAppSelector} from "../../../hooks/hook";
import {AddCardModal} from '../../Modals/Add Card/AddCard';
import {MyCardMenu} from "./MyCardMenu/MyCardMenu";
import {ROUTS} from "../../../App";
import {NavLink} from "react-router-dom";



export const HeaderTitle = () => {
    const profileId = useAppSelector(state => state.profile._id)
    const friendsId = useAppSelector(state => state.cars.packUserId)
    const namePacs = useAppSelector(state => state.cars.packName)
    //const title = profileId === friendsId ? 'My Pack' : "Friend's Pack"
    //const title = profileId  ? 'My Pack' : "Friend's Pack"

    return (
        <div className={style.containerHeaderTitle}>
            <div className={style.title}>
                <div>{namePacs}</div>
                {namePacs === profileId && <MyCardMenu/>}
            </div>
            {namePacs === profileId ? (
                <AddCardModal />
            ) : (
                <>
                <div>{namePacs}</div>
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
