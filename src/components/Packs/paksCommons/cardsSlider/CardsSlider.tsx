import React, {useState} from 'react'
import Slider from '@mui/material/Slider'
import style from './CardsSlider.module.css'
import {useAppDispatch, useAppSelector} from "../../../../hooks/hook";
import {useSearchParams} from "react-router-dom";
import {changeCardsNumberInPackAC} from "../../../../redux/main-reducer";


export const CardsSlider = () => {
    const minValue = useAppSelector(state => state.main.minCardsCount)
    const maxValue = useAppSelector(state => state.main.maxCardsCount)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<number[]>([minValue, maxValue])

    const [searchParams, setSearchParams] = useSearchParams({
        min: '0',
        max: '53',
    })

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const onChangeCommittedHandler = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
        const value = newValue as number[]

        searchParams.set('min', value[0].toString())
        searchParams.set('max', value[1].toString())

        setSearchParams({ ...searchParams, min: value[0].toString(), max: value[1].toString() })

        dispatch(changeCardsNumberInPackAC(value[0], value[1]))
    }

    return (
        <div className={style.wrapper}>
            <div className={style.text}>Number of cards</div>
            <div className={style.slider}>
                <div className={style.value}>
                    <div className={style.count}>{value[0]}</div>
                </div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={onChangeCommittedHandler}
                    valueLabelDisplay="auto"
                    sx={{width: '155px'}}
                    size="small"
                    className={style.sliderMain}
                />
                <div className={style.value}>
                    <div className={style.count}>{value[1]}</div>
                </div>
            </div>
        </div>
    )
}