import React from 'react'

import style from './CardHeaderTitle.module.css'

import {useAppSelector} from "../../../hooks/hook";
import { AddCardModal } from '../../Modals/Add Card/AddCard';
import {MyCardMenu} from "./MyCardMenu/MyCardMenu";


export const HeaderTitle = () => {
    const profileId = useAppSelector(state => state.profile._id)
    const friendsId = useAppSelector(state => state.cars.packUserId)
  //  const title = myId === friendsId ? 'My Pack' : "Friend's Pack"
    const title = profileId ? 'My Pack' : "Friend's Pack"

    return (
        <div className={style.titleAndButton}>
            <div className={style.title}>
                <div>{title}</div>
                {title === 'My Pack' && <MyCardMenu/>}
            </div>
            {title === 'My Pack' ? (
                <AddCardModal />
            ) : (
                <button>
                    Learn to pack
                </button>
            )}
        </div>
    )
}