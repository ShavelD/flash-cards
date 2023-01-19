import React, {ChangeEvent, FC, useState} from 'react'

import {FormGroup, Select, MenuItem, SelectChangeEvent, Box, TextField} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import {useFormik} from 'formik'
import {useAppDispatch} from "../../../hooks/hook";
import {addCardTC, updateCardTC} from "../../../redux/cards-reducer";
import {BasicModal} from "../BasicModals";
import style from './CardsModal.module.css'
import {CardType} from "../../../redux/main-reducer";
import {Title} from "./Title/Title"


export const CardsModal: FC<CardsModalType> = ({
                                                   titleName,
                                                   id_pack,
                                                   id_card,
                                                   open,
                                                   hide,
                                                   cardQuestion,
                                                   cardAnswer,
                                                   answerImg,
                                                   questionImg
                                               }) => {
    const dispatch = useAppDispatch()
    const [itemName, setItemName] = useState('Text')
    const menuItems = ['Text', 'Image', 'Video']

    const handleChange = (event: SelectChangeEvent) => {
        setItemName(event.target.value as string)
    }

    const formik = useFormik({
        initialValues: {
            question: cardQuestion ? cardQuestion : '',
            answer: cardAnswer ? cardAnswer : '',
            answerImg: answerImg || '',
            questionImg: questionImg || '',
        },
        validate: (values: ValuesType) => {
            const errors: FormikErrorType = {}

            if (!values.question) {
                errors.question = 'Required field'
            } else if (values.question.length > 70) {
                errors.question = 'Question length must be lower than 70 symbols'
            }

            if (!values.answer) {
                errors.answer = 'Required field'
            } else if (values.answer.length > 70) {
                errors.answer = 'Answer length must be lower than 70 symbols'
            }

            return errors
        },
        onSubmit: (values: ValuesType) => {
            if (titleName === 'Add new card' && itemName === 'Text') {
                dispatch(addCardTC({
                        cardsPack_id: id_pack,
                        question: values.question,
                        answer: values.answer

            }))
                hide()
            // } else if (titleName === 'Add new card' && itemName === 'Image') {
            //     dispatch(
            //         addCardTC( {
            //             cardsPack_id: id_pack,
            //             answerImg: values.answerImg,
            //             questionImg: values.questionImg
            //         })
            //     )
                hide()
            } else if (titleName === 'Edit card') {
                dispatch(
                    updateCardTC(id_pack, {
                        _id: id_card ? id_card : '',
                        question: values.question,
                        answer: values.answer,
                    })
                )
                hide()
            }
        },
    })

    const { values} = { ...formik };
    const [val, setVal] = useState(values);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    // const changeValue = (value: string): void => {
    //     values.answerImg && value.questionImg = value;
    //     setVal({ ...val, answerImg: value, questionImg: value });
    //     setIsDirty(true);
    // };

    return (
        <>
            <BasicModal open={open}>
                <form className={style.formAddNewPack} onSubmit={formik.handleSubmit}>
                    <div className={style.headerModalAddNewPack}>
                        <Title text={titleName}/>
                        <button onClick={hide}>X</button>
                    </div>
                    <hr/>
                    <FormGroup>
                        <InputLabel className={style.label}>Choose a question format</InputLabel>
                        <Select value={itemName} label="Choose a question format" onChange={handleChange}
                                sx={{height: '36px'}}
                        >
                            {menuItems.map((i, index) => (
                                <MenuItem key={index} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box>
                            <TextField sx={{width: '37.4ch', mt: '20px'}}
                                       id="input-with-sx" label="Question" variant="standard"
                                       {...formik.getFieldProps('question')}/>
                            {formik.touched.question && formik.errors.question ?
                                <div style={{color: 'red'}}>{formik.errors.question}</div> : null}
                        </Box>
                        <Box>
                            <TextField sx={{width: '37.4ch', mt: '20px'}}
                                       id="input-with-sx" label="Answer" variant="standard"
                                       {...formik.getFieldProps('answer')}/>
                            {formik.touched.answer && formik.errors.answer ?
                                <div style={{color: 'red'}}>{formik.errors.answer}</div> : null}
                        </Box>
                        <button type="submit" className={style.buttonSaveAdd}>Save</button>
                    </FormGroup>
                </form>
            </BasicModal>
        </>
    )
}

type CardsModalType = {
    titleName: string
    id_pack: string
    open: boolean
    hide: () => void
    id_card?: string
    cardQuestion?: string
    cardAnswer?: string
    answerImg?: string
    questionImg?: string
}
type FormikErrorType = {
    question?: string
    answer?: string
}
type ValuesType = Pick<CardType, 'question' | 'answer' | 'answerImg' | 'questionImg'>