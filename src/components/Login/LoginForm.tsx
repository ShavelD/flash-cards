import React from 'react';
import style from './LoginForm.module.css'
import {useFormik} from "formik";
import FormControl from '@mui/material/FormControl';
import {Box, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {ROUTS} from "../../App";
import {loginTC} from "../../redux/auth-reducer";
import {useAppDispatch} from "../../hooks/hook";
import {LoginParamsType} from "../../api/auth-api";

// interface Values {
//     email: string
//     password: string
//     rememberMe: boolean
// }

// type PropsType = {
//     onHandlerSubmit: (data: Values) => void
//
// }

type errorsType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

const validate = (values: LoginParamsType) => {
    const errors: errorsType = {};

    if (!values.email) {
        errors.email = 'заполните поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'некорректный email';
    }

    if (!values.password) {
        errors.password = 'введите пароль';
    } else if (values.password.length < 3) {
        errors.password = 'некорректный пароль';
    }

    return errors;
};

export const LoginForm = (props: LoginParamsType) => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: (values: LoginParamsType) => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <h1>Sign in</h1>
                <div className={style.wrapperInput}>
                    <Box>
                        <TextField sx={{width: '30ch'}}
                                   id="input-with-sx" label="Email" variant="standard"
                                   {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </Box>
                </div>
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
                <div className={style.wrapperRememberMe}>
                    <input
                        type={'checkbox'}
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <div>Remember me</div>
                </div>
                <div className={style.wrapperTextPassword}>
                    <NavLink to={ROUTS.PASS_RECOVERY} className={style.navlink}> Forgot your password?</NavLink>
                </div>
                <div className={style.wrapperButton}>
                    <button type="submit" className={style.button}>Sign in</button>
                </div>
                <div className={style.wrapperTextAccount}>
                    Still don't have an account?
                </div>
                <div className={style.wrapperTextSignUp}>
                    <NavLink to={ROUTS.REGISTRATION} className={style.navlink}>Sign Up</NavLink>
                </div>
            </form>
        </div>
    );
};

