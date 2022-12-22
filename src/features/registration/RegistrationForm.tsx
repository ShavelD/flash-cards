import React from "react";
import {useFormik} from "formik";
import style from "../../components/Login/LoginForm.module.css";
import {Box, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {ROUTS} from "../../App";


interface Values {
    email: string
    password: string
    passwordConfirm?: string
}

type PropsType = {
    onClickHandler: (data: Values) => void
}

type FormikErrorType = {
    email?: string,
    password?: string,
    passwordConfirm?: string,
}

const validate = (values: any) => {
    const errors: FormikErrorType = {};

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

    if (values.passwordConfirm !== values.password) {
        errors.passwordConfirm = 'пароль не совпадает';
    } else if (values.passwordConfirm.length < 3) {
        errors.passwordConfirm = 'некорректный пароль';
    }

    return errors;
};

export const RegistrationForm: React.FC<PropsType> = (props) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate,
        onSubmit: values => {
            props.onClickHandler(values)
        },
    })

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);


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
                <div className={style.wrapperInput}>
                    <FormControl sx={{width: '30ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-passwordConfirm">Confirm password</InputLabel>
                        <Input
                            id="standard-adornment-passwordConfirm"
                            type={showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('passwordConfirm')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPasswordConfirm ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ?
                            <div style={{color: 'red'}}>{formik.errors.passwordConfirm}</div> : null}
                    </FormControl>
                </div>
                <div className={style.wrapperButton}>
                    <button type="submit" className={style.button}>Sign in</button>
                </div>
                <div className={style.wrapperTextAccount}>
                    Already have an account?
                </div>
                <div className={style.wrapperTextSignUp}>
                    <NavLink to={ROUTS.LOGIN} className={style.navlink}>Sign In</NavLink>
                </div>
            </form>
        </div>
    );
};