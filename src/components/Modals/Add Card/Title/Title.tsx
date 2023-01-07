import React, { FC } from 'react'

import style from './Title.module.css'

export const Title: FC<TitleType> = ({ text, titleStyle }) => {
    return (
        <div className={titleStyle ? titleStyle : style.title}>
            <h2>{text}</h2>
        </div>
    )
}

type TitleType = {
    text: string
    titleStyle?: string
}
