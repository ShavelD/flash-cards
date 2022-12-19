import React from 'react'
import style from "../../components/Login/LoginForm.module.css"
import styles from "../pass-recovery/PassRecovery.module.css"
import {IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {ROUTS} from "../../App";
import {useFormik} from "formik";
import FormControl from "@mui/material/FormControl";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {setNewPassTC} from "../../redux/auth-reducer";
import {useAppDispatch} from "../../hooks/hook";

type FormikErrorType = {
    password?: string,
}

const validate = (values: any) => {
    const errors: FormikErrorType = {};

    if (!values.password) {
        errors.password = 'введите пароль';
    } else if (values.password.length < 3) {
        errors.password = 'некорректный пароль';
    }

    return errors;
};

export const CreateNewPassword = () => {

    const dispatch = useAppDispatch()

    const {resetToken} = useParams<{ resetToken: string }>()

    const formik = useFormik({
        initialValues: {
            password: '',

        },
        validate,
        onSubmit: values => {
            resetToken && dispatch(setNewPassTC(values.password, resetToken))
        },
    })

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <div className={style.wrapper}>
                <form className={styles.form}
                      onSubmit={formik.handleSubmit}
                >
                    <h1>Create new password</h1>
                    <div className={style.wrapperInput}>
                        <FormControl sx={{width: '30ch'}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        </FormControl>
                    </div>

                    <div className={style.wrapperButton}>
                        <button type="submit" className={style.button}>Create new password</button>
                    </div>
                    <div className={style.wrapperTextAccount}>
                        Create new password and we will send you further <br/> instructions to email
                    </div>
                </form>
            </div>
        </>
    )
}