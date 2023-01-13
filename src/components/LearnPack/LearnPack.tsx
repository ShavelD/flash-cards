import React, { useEffect, useState } from 'react'
import { Button, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import {Navigate, Routes, useParams} from 'react-router-dom'
import style from './LearnPack.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {getRandomCardTC, updateGradeTC} from "../../redux/learnPack-reducer";
import {BackToCardPacks} from "../../common/BackToCardPacks/BackToCardPacks";
import {Grades} from "./Grades/Grades";
import {CardType} from "../../redux/main-reducer";
import {getCard} from "../../common/utils/getCard";
import {ROUTS} from "../../App";


export const LearnPack = () => {
    const dispatch = useAppDispatch()
    const [isClickButton, setIsClickButton] = useState(false)
    const { packId } = useParams()
    const packName = useAppSelector(state => state.cars.packName)
    const grade = useAppSelector(state => state.learnPack.grade)
    const randomCard = useAppSelector(state => state.learnPack.randomCard)
    const cards = useAppSelector(state => state.main.cards);

    const [card, setCard] = useState<CardType>(getCard(cards));

    const setAnswerHandler = () => {
        if (packId) dispatch(updateGradeTC(packId, randomCard._id, grade))
        setIsClickButton(false)
        setCard(getCard(cards));
    }

    useEffect(() => {
        if (packId) dispatch(getRandomCardTC(packId))
    }, [packId])

    if (cards.length === 0) return <Navigate to={ROUTS.CARDS} />;

    return (
        <Grid container justifyContent={'center'}>
            <BackToCardPacks/>
            <Grid display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
                <Typography component="legend" variant="h5" sx={{ mt: 5, mb: 2 }}>
                    Learn {`"${packName}"`}
                </Typography>
                <Card sx={{ width: 440, minHeight: 200 }}>
                    <div className={style.cardQuestion_main}>
                        <div className={style.cardQuestion_question}>
                            <b>Question:</b> {card.question}
                        </div>
                        <div className={style.cardQuestion_attempt}>
                            Number of attempts for this question: {card.shots}
                        </div>
                        <div className={style.cardQuestion_button}>
                            {!isClickButton && (
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => setIsClickButton(true)}
                                    sx={{ borderRadius: '30px', mt: 3 }}
                                    style={{ width: 335 }}
                                >
                                    Show Answer
                                </Button>
                            )}
                            {isClickButton && (
                                <Grid container justifyContent={'center'}>
                                    <Grid display="flex" justifyContent="center" alignItems="center">
                                        <div className={style.cardQuestion_main}>
                                            <div className={style.cardAnswer_answer}>
                                                <b>Answer:</b> {card.answer}
                                            </div>
                                            <div className={style.cardAnswer_rateYourself}>
                                                <Grades />
                                            </div>
                                            <div className={style.cardQuestion_button}>
                                                <Button
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    onClick={setAnswerHandler}
                                                    sx={{ borderRadius: '30px', mt: 3 }}
                                                    style={{ width: 335 }}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                /*<CardAnswer
                                  packId={packId}
                                  setIsClickButton={setIsClickButton}
                                  setAnswerHandler={setAnswerHandler}
                                />*/
                            )}
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}
