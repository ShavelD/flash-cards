import React from 'react'
import style from "../../components/Login/LoginForm.module.css"
import styles from "./PassRecovery.module.css"
import {Box, TextField} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {ROUTS} from "../../App";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {forgoPassTC} from "../../redux/auth-reducer";



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

export const PassRecovery = () => {
    const isMessageSent = useAppSelector(state => state.auth.isMessageSent)


    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validate,
        onSubmit: values => {
            dispatch(forgoPassTC(values.email))
        },
    })

    if (isMessageSent) {
        <Navigate to={"/email_confirmation/"}/>
    }

    return (
        <>
            <div className={style.wrapper}>
                <form className={styles.form}
                      onSubmit={formik.handleSubmit}
                >
                    <h1>Forgot your password?</h1>
                    <div className={style.wrapperInput}>
                        <Box>
                            <TextField sx={{width: '30ch'}}
                                       id="input-with-sx" label="Email" variant="standard"
                                       {...formik.getFieldProps('email')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <div>
                                <p>
                                    Enter your email address and we will send you <br/>further instructions
                                </p>
                            </div>
                        </Box>
                    </div>
                    <div className={style.wrapperButton}>
                        <button type="submit" className={style.button}>Send Instructions</button>
                    </div>
                    <div className={style.wrapperTextAccount}>
                        Did you remember your password?
                    </div>
                    <div className={styles.wrapperTextSignUp}>
                        <NavLink to={ROUTS.LOGIN} className={styles.navlink}>Try logging in</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}



//добавила
// import React from 'react'
// import style from "../../components/Login/LoginForm.module.css"
// import styles from "./PassRecovery.module.css"
// import {Box, TextField} from "@mui/material";
// import {NavLink, useNavigate} from "react-router-dom";
// import {ROUTS} from "../../App";
// import {useFormik} from "formik";
// import {useAppDispatch} from '../../hooks/hook';
// import {redirectToEmailTC} from "../../redux/auth-reducer";
//
//
//
// export type FormikErrorType = {
//     email?: string,
// }
//
// const validate = (values: any) => {
//     const errors: FormikErrorType = {};
//
//     if (!values.email) {
//         errors.email = 'заполните поле';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'некорректный email';
//     }
//
//     return errors;
// };
//
// export const PassRecovery = () => {
//
//     const dispatch = useAppDispatch()
//     const navigate = useNavigate()
//
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//
//         },
//         validate,
//         onSubmit: values => {
//             alert(JSON.stringify(values));
//             formik.resetForm()
//             dispatch(redirectToEmailTC(values))
//             navigate('/email_confirmation')
//         },
//     })
//
//     return (
//         <>
//             <div className={style.wrapper}>
//                 <form className={styles.form}
//                       onSubmit={formik.handleSubmit}
//                 >
//                     <h1>Forgot your password?</h1>
//                     <div className={style.wrapperInput}>
//                         <Box>
//                             <TextField sx={{width: '30ch'}}
//                                        id="input-with-sx" label="Email" variant="standard"
//                                        {...formik.getFieldProps('email')}
//                             />
//                             {formik.touched.email && formik.errors.email ?
//                                 <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
//
//                             <div>
//                                 <p>
//                                     Enter your email address and we will send you <br/>further instructions
//                                 </p>
//                             </div>
//                         </Box>
//                     </div>
//
//                     <div className={style.wrapperButton}>
//                         <button type="submit" className={style.button}>Send instructions</button>
//                     </div>
//                     <div className={style.wrapperTextAccount}>
//                         Did you remember your password?
//                     </div>
//                     <div className={styles.wrapperTextSignUp}>
//                         <NavLink to={ROUTS.LOGIN} className={styles.navlink}>Try logging in</NavLink>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }