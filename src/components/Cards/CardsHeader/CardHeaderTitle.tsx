import React, {useState} from 'react'

import style from './CardHeaderTitle.module.css'

import {useAppSelector} from "../../../hooks/hook";
import {AddCardModal} from '../../Modals/Add Card/AddCard';
import {MyCardMenu} from "./MyCardMenu/MyCardMenu";
import {useNavigate, useParams} from "react-router-dom";
import defAva from '../../../assets/images/Avatar.jpg'


export const HeaderTitle = () => {
    const profileId = useAppSelector(state => state.cars.packUserId)
    const myId = useAppSelector(state => state.profile._id)
    const namePacs = useAppSelector(state => state.cars.packName)
    const imageCard = useAppSelector(state => state.main.deckCover)
    const navigate = useNavigate()
    const {id_pack} = useParams()

    const handleClick = () => {
        if (id_pack) navigate(`/question/${id_pack}`)
    }

    return (
        <div className={style.block}>
            <div className={style.containerHeaderTitle}>
                <div className={style.title}>
                    <div style={{width: '150px'}}>{namePacs}</div>
                    {myId === profileId && <MyCardMenu/>}
                </div>
                {myId === profileId ? (
                    <AddCardModal/>
                ) : (
                    <>
                        <button onClick={handleClick} className={style.headerTitleButton}>
                            Learn to pack
                        </button>
                    </>
                )}
            </div>
            <div>
                <img src={imageCard ? imageCard : defAva} alt='PackCover' style={{height: '70px', paddingLeft: '10px'}}/>
            </div>
        </div>
    )
}
