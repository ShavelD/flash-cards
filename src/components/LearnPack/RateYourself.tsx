import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useFormik} from "formik";
import style from './RateYourself.module.css'

type RateYourselfType = {
    setIsAnswered: (isAnswered: boolean) => void
}

export const RateYourself = (props: RateYourselfType) => {
    const formik = useFormik({
        initialValues: {
            value: '',
        },
        validate: () => {},
        onSubmit: () => {},
    })

    const onClickHandler = (value: boolean) => {
        props.setIsAnswered(value)
    }

    return (
        <div className={style.containerRateYourself}>
            <div className={style.questionOrAnswerRateYourself}>Answer:</div>
            <FormControl>
                <FormLabel>Rate yourself:</FormLabel>
                <RadioGroup defaultValue="Knew the answer" name="radio-buttons-group">
                    <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />
                    <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
                    <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
                    <FormControlLabel value="Сonfused" control={<Radio />} label="Сonfused" />
                    <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
                </RadioGroup>
            </FormControl>
            <div className={style.containerButton}>
            <button className={style.buttonRateYourself} onClick={() => onClickHandler(false)}
            >
                Next
            </button>
            </div>
        </div>
    )
}