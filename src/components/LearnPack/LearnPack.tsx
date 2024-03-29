import React, {useEffect, useState} from 'react'
import {Button, Card} from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import {useParams} from 'react-router-dom'
import style from './LearnPack.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {getRandomCardTC, updateGradeTC} from "../../redux/learnPack-reducer";
import {BackToCardPacks} from "../../common/BackToCardPacks/BackToCardPacks";
import {Grades} from "./Grades/Grades";


export const LearnPack = () => {
    const dispatch = useAppDispatch()
    const [isClickButton, setIsClickButton] = useState(false)
    const {id_pack} = useParams()
    const packName = useAppSelector(state => state.learnPack.packName)
    const grade = useAppSelector(state => state.learnPack.grade)
    const randomCard = useAppSelector(state => state.learnPack.randomCard)


    const setAnswerHandler = () => {
        if (id_pack) dispatch(updateGradeTC(id_pack, randomCard._id, grade))
        setIsClickButton(false)
    }

    useEffect(() => {
        if (id_pack) dispatch(getRandomCardTC(id_pack))
    }, [id_pack])


    return (
        <Grid container justifyContent={'center'}>
            <div className={style.backToCardPacks}>
            <BackToCardPacks />
            </div>
            <Grid display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
                <Typography component="legend" variant="h5" sx={{mt: 5, mb: 2}}>
                    Learn {`"${packName}"`}
                </Typography>
                <Card sx={{width: 440, minHeight: 200}}>
                    <div className={style.cardQuestion_main}>
                        <div className={style.cardQuestion_question}>
                            <b>Question:</b>
                            {randomCard.questionImg ? (
                                <img
                            src={randomCard.questionImg}
                            alt="deckCover"
                            style={{height: '60px', width: '40'}}
                        />
                            ) : (
                                randomCard.question
                            )}
                        </div>
                        <div className={style.cardQuestion_attempt}>
                            Number of attempts for this question: {randomCard.shots}
                        </div>
                        <div className={style.cardQuestion_button}>
                            {!isClickButton && (
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => setIsClickButton(true)}
                                    sx={{borderRadius: '30px', mt: 3}}
                                    style={{width: 335}}
                                >
                                    Show Answer
                                </Button>
                            )}
                            {isClickButton && (
                                <Grid container justifyContent={'center'}>
                                    <Grid display="flex" justifyContent="center" alignItems="center">
                                        <div className={style.cardQuestion_main}>
                                            <div className={style.cardAnswer_answer}>
                                                <b>Answer:</b>
                                                {randomCard.answerImg ? (
                                                <img
                                                    src={randomCard.answerImg}
                                                    alt="deckCover"
                                                    style={{height: '60px', width: '40'}}
                                                />
                                            ) : (
                                                randomCard.answer
                                            )}
                                            </div>
                                            <div className={style.cardAnswer_rateYourself}>
                                                <Grades/>
                                            </div>
                                            <div className={style.cardQuestion_button}>
                                                <Button
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    onClick={setAnswerHandler}
                                                    sx={{borderRadius: '30px', mt: 3}}
                                                    style={{width: 335}}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}
