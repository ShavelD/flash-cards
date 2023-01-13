import React from 'react';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import style from './LearnPaper.module.css';
import {CardType} from "../../../redux/main-reducer";
import {ReturnComponentType} from "../../../common/Types/ReturnComponentType";
import {GeneralButton} from "../../../common/GeneralButton/GeneralButton";



type PropsType = {
    buttonLabel: string;
    card: CardType;
    onClick: () => void;
    children?: ReturnComponentType;
};
export const LearnPaper: React.FC<PropsType> = ({
                                                    card,
                                                    onClick,
                                                    buttonLabel,
                                                    children,
                                                }) => {
    return (
        <Paper elevation={3} className={style.paper}>
            <Typography className={style.question}>
                <b>Question:</b>{' '}
                {card.questionImg ? (
                    <div>
                        <img src={card.questionImg} alt="question" className={style.questionImg} />
                    </div>
                ) : (
                    card.question
                )}
            </Typography>
            <Typography className={style.attempts}>
                Number of attempts to answer the question: <b>{card.shots}</b>
            </Typography>
            {children}
            <div className={style.generalButtonPaper}>
            <GeneralButton onClick={onClick} label={buttonLabel} />
            </div>
        </Paper>
    );
};