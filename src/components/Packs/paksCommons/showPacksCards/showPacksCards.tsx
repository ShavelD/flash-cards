import React from 'react'
import style from './showPacksCards.module.css'


export const ShowPacksCards = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.text}>Show packs cards</div>
            <div className={style.buttons}>
                <button>My</button>
                <button>All</button>
            </div>
        </div>
    )
}