import React, {useEffect} from 'react'
import style from "./Profile.module.css";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {NavLink} from "react-router-dom";
import {KeyboardBackspace} from "@mui/icons-material";
import {ROUTS} from "../../App";
import logout from "../../../../flash-cards/src/assets/images/logout.jpg"
import shibaImg from "../../../../flash-cards/src/assets/images/1559640002_08f026.jpg"
import {Box} from "@mui/material";
import {useFormik} from "formik";
import {loginTC, logOutTC} from "../../redux/auth-reducer";
import {changeProfileTC} from "../../redux/profile-reducer";
import {Navigate} from "react-router-dom";


export const Profile = () => {
    const user = useAppSelector(state => state.profile.name)
    const showEmail = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isFetching = useAppSelector(state => state.app.isFetching)
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

    return (
        <div className={style.wrapper}>
            <div><NavLink to={ROUTS.PACKS} className={style.navlink}><KeyboardBackspace/>
                <div className={style.text}>Back to Packs List</div>
            </NavLink>
            </div>
            <div className={style.flex}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <h2>Personal Information</h2>
                    <div className={style.shibaImg}><img src={shibaImg} alt="" className={style.img}/></div>
                    <div className={style.wrapperInput}>
                        <Box>
                            <EditableSpan updateUserName={updateUserHandler} name={user}/>
                        </Box>
                    </div>
                    <div className={style.email}>{showEmail}</div>
                    {!isFetching
                        ? <div className={style.wrapperButton}>
                            <button type="submit" className={style.button} onClick={logOut}>
                                <div className={style.logout}><img src={logout} alt={'logout'}/>
                                    Log out
                                </div>
                            </button>

                        </div>
                        : <Navigate to={"/login"}/>
                    }
                </form>
            </div>
        </div>
    )
}