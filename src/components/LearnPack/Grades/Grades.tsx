import React, {ChangeEvent} from 'react';
import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import style from './Grades.module.css';
import {ReturnComponentType} from "../../../common/Types/ReturnComponentType";
import {useAppDispatch} from "../../../hooks/hook";
import {setGradeAC} from "../../../redux/learnPack-reducer";


export const Grades = (): ReturnComponentType => {
    const dispatch = useAppDispatch()

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setGradeAC(e.currentTarget.value))
    }

    return (
        <FormControl className={style.main}>
            <FormLabel className={style.rate}>Rate yourself:</FormLabel>
            <RadioGroup defaultValue={1} name="radio-buttons-group" onChange={handleRadioChange}>
                <FormControlLabel value={1} control={<Radio/>} label="Did not know"/>
                <FormControlLabel value={2} control={<Radio/>} label="Forgot"/>
                <FormControlLabel value={3} control={<Radio/>} label="A lot of thought"/>
                <FormControlLabel value={4} control={<Radio/>} label="Сonfused"/>
                <FormControlLabel value={5} control={<Radio/>} label="Knew the answer"/>
            </RadioGroup>
        </FormControl>
    );
};