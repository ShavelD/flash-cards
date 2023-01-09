import {useAppSelector} from "../../hooks/hook";
import {RateYourself} from "./RateYourself";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import style from './LearnPack.module.css'
import {ROUTS} from "../../App";
import {KeyboardBackspace} from "@mui/icons-material";
import * as React from "react";


export const LearnPack = () => {

    const {id_pack} = useParams()
    const cards = useAppSelector(state => state.main.cards)
    const pack = useAppSelector(state => state.main.packs.find(pack => pack._id === id_pack))
    const packName = useAppSelector(state => state.cars.packName)
    // const questionName = useAppSelector (state => state.)
    const counter = pack && pack.shots

    console.log(cards)

    const [isAnswered, setIsAnswered] = useState<boolean>(false)

    return (
        <div>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <div className={style.title}> Learn {packName}</div>
            <Paper elevation={3} square className={style.learn}>
                <div className={style.questionOrAnswer}>Question:</div>
                <div className={style.counter}>Количество попыток ответов на вопрос: {counter}</div>

                {isAnswered ? (
                    <RateYourself setIsAnswered={setIsAnswered}/>
                ) : (
                    <button onClick={() => setIsAnswered(true)} className={style.showAnswer}>
                        Show answer
                    </button>
                )}
            </Paper>
        </div>
    )

}