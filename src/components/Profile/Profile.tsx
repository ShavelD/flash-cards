import React from 'react'
import style from "./Profile.module.css";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {NavLink} from "react-router-dom";
import {KeyboardBackspace} from "@mui/icons-material";
import {ROUTS} from "../../App";
import logout from "../../../../flash-cards/src/assets/images/logout.jpg"
import {Box} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {logOutTC} from "../../redux/auth-reducer";
import {changeProfileTC} from "../../redux/profile-reducer";
import ChibaImg from "../../../../flash-cards/src/assets/images/Avatar.jpg"
import newUserPhoto from "../../../../flash-cards/src/assets/images/newUserPhoto.svg"
import {InputTypeFile} from "./InputTypeFile/InputTypeFile";




interface Values {
    name: string
}

export const Profile = () => {
    const userName = useAppSelector(state => state.profile.name)
    const showEmail = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const updateUserHandler = (name: string) => {
        dispatch(changeProfileTC({name}))
    }
    const logOut = () => {
        dispatch(logOutTC())
    }
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: () => {
            logOut()
        },
    })

    if (!isLoggedIn) {
        return <Navigate to={ROUTS.LOGIN}/>
    }
    console.log(showEmail)
    return (
        <div className={style.wrapper}>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <div className={style.flex}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <h2 className={style.Info}>Personal Information</h2>
                    <div className={style.shibaImg}>
                        <img src={ChibaImg} alt="" className={style.img}/>
                        <InputTypeFile />
                        {/*<img onClick={() => {alert('Ты не любишь собак?')}} src={newUserPhoto} alt="" className={style.newUserPhoto}/>*/}
                    </div>
                    <div className={style.wrapperInput}>
                        <Box>
                            <EditableSpan updateUserName={updateUserHandler} name={userName}/>
                        </Box>
                    </div>
                    <div className={style.email}>{showEmail}</div>
                    <div className={style.wrapperButton}>
                        <button type="submit" className={style.button} onClick={logOut}>
                            <div className={style.logout}><img src={logout} alt={'logout'}/>
                                Log out
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}