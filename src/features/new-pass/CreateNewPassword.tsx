import React from 'react'
import style from "../../components/Login/LoginForm.module.css"
import styles from "../pass-recovery/PassRecovery.module.css"
import {IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ROUTS} from "../../App";
import {useFormik} from "formik";
import FormControl from "@mui/material/FormControl";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
    email?: string,
}

const validate = (values: any) => {
    const errors: FormikErrorType = {};

    if (!values.email) {
        errors.email = 'заполните поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'некорректный email';
    }

    return errors;
};

export const CreateNewPassword = () => {

    const formik = useFormik({
        initialValues: {
            password: '',

        },
        validate,
        onSubmit: values => {
            // props.onHandlerSubmit(values)
            alert(JSON.stringify(values));
            formik.resetForm()
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
                        <button type="submit" className={style.button}>Send instructions</button>
                    </div>
                    <div className={style.wrapperTextAccount}>
                        Create new password and we will send you further <br/> instructions to email
                    </div>
                    <div className={styles.wrapperTextSignUp}>
                        <NavLink to={ROUTS.LOGIN} className={styles.navlink}>Create new password</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

