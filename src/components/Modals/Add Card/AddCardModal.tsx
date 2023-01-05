import React, {FC, useState} from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {FormGroup, Select, MenuItem, SelectChangeEvent, IconButton, Box, TextField} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import {useFormik} from 'formik'
import {useAppDispatch} from "../../../hooks/hook";
import {addCardTC} from "../../../redux/cards-reducer";
import {BasicModal} from "../BasicModals";
import style from './CardsModal.module.css'
import {CardType} from "../../../redux/main-reducer";


export const CardsModal: FC<CardsModalType> = ({
                                                   id_pack,
                                                   open,
                                                   hide,
                                                   cardQuestion,
                                                   cardAnswer,
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
            dispatch(addCardTC({cardsPack_id: id_pack, question: values.question, answer: values.answer}))
            hide()
        },
    })

    return (
        <>
            <BasicModal open={open}>
                <div className={style.head}>
                    <h2>Add new card</h2>
                    <button onClick={hide}>X</button>
                </div>
                <hr/>
                <div>
                    <IconButton onClick={hide} className={style.iconButton}>
                        <CloseIcon fontSize={'large'}/>
                    </IconButton>
                </div>
                <hr/>
                <FormGroup>
                    <InputLabel className={style.label}>Choose a question format</InputLabel>
                    <Select value={itemName} label="Choose a question format" onChange={handleChange}>
                        {menuItems.map((i, index) => (
                            <MenuItem key={index} value={i}>
                                {i}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box>
                        <TextField sx={{width: '37.4ch'}}
                                   id="input-with-sx" label="Question" variant="standard"
                                   {...formik.getFieldProps('question')}/>
                        {formik.touched.question && formik.errors.question ?
                            <div style={{color: 'red'}}>{formik.errors.question}</div> : null}
                    </Box>
                    <Box>
                        <TextField sx={{width: '37.4ch'}}
                                   id="input-with-sx" label="Answer" variant="standard"
                                   {...formik.getFieldProps('answer')}/>
                        {formik.touched.answer && formik.errors.answer ?
                            <div style={{color: 'red'}}>{formik.errors.answer}</div> : null}
                    </Box>
                    <button type="submit" className={style.buttonSave}>Save</button>
                </FormGroup>
            </BasicModal>
        </>
    )
}

type CardsModalType = {
    titleName?: string
    id_pack: string
    open: boolean
    hide: () => void
    id_card?: string
    cardQuestion?: string
    cardAnswer?: string
}
type FormikErrorType = {
    question?: string
    answer?: string
}
type ValuesType = Pick<CardType, 'question' | 'answer'>