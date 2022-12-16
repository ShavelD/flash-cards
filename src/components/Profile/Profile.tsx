import React from 'react'
import style from "./Profile.module.css";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {updateUserTC} from "../../redux/profile-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {MePropsType, UpdateUserType} from "../../api/auth-api";
import {NavLink} from "react-router-dom";
import {KeyboardBackspace} from "@mui/icons-material";
import {ROUTS} from "../../App";
import logout from "../../../../flash-cards/src/assets/images/logout.jpg"
import shibaImg from "../../../../flash-cards/src/assets/images/1559640002_08f026.jpg"
import {Box} from "@mui/material";
import {useFormik} from "formik";
import {logOutTC} from "../../redux/auth-reducer";


export const Profile = () => {
    const user = useSelector<AppRootStateType, MePropsType>(state => state.profile.user)
    const dispatch = useAppDispatch()

    const updateUserHandler = (data: UpdateUserType) => {
        //debugger
        dispatch(updateUserTC(data))
    }

    const logOut = () => {
        dispatch(logOutTC())
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: values => {
            console.log(values)
            formik.resetForm()
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
                            <EditableSpan updateUserName={updateUserHandler} name={user.name}/>
                        </Box>
                    </div>
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