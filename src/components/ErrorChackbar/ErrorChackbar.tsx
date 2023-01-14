import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {RequestStatusType, setAppErrorAC} from "../../redux/app-reducer";
import {useAppDispatch} from "../../hooks/hook";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
    // const [open, setOpen] = React.useState(true);
    const error = useSelector<AppRootStateType, string|null>(state => state.app.error)

    const dispatch = useAppDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (

            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

    );
}

// import React, {useEffect} from "react";
// import style from './Alert.module.css'
// import {useAppDispatch, useAppSelector} from "../../store/store";
// import {CloseSvgIcon} from "../../assets/icons/CloseSvgIcon";
// import {setAppError} from "../../reducers/app-reducer";
//
// export const Alert = () => {
//
//     const dispatch = useAppDispatch()
//
//     const error = useAppSelector(state => state.app.appError)
//
//     const alertClassName = `${style.wrapper} ${error ? style.open : ''}`
//
//     const handleClose = () => {
//         dispatch(setAppError(''))
//     }
//
//     useEffect(() => {
//         if (error) {
//             setTimeout(() => {
//                 dispatch(setAppError(''))
//             }, 6000)
//         }
//     }, [error, dispatch])
//
//     return (
//         <div className={alertClassName}>
//             <div className={style.message}>{error}</div>
//             <button onClick={handleClose} type='button' className={style.closeButton}><CloseSvgIcon/></button>
//         </div>
//     )
// }