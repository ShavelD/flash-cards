import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import {Test} from "./components/Test/Test";
import {Registration} from "./features/registration/Registration";
import {CreateNewPassword} from "./features/new-pass/CreateNewPassword";
import {Profile} from "./components/Profile/Profile";
import {PassRecovery} from "./features/pass-recovery/PassRecovery";
import {RoutesNavLink} from "./routes/RoutesNavLink";
import {Header} from "./components/Header/Header";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {Login} from "./components/Login/Login";
import EmailConfirmation from "./components/emailConfirmation/EmailConfirmation";
import {Packs} from "./components/Packs/Packs";
import {Cards} from "./components/Cards/Cards";
import {RequestStatusType, setIsInitializedTC} from "./redux/app-reducer";
import {useAppDispatch, useAppSelector} from "./hooks/hook";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {NewPack} from "./components/Packs/NewPack/NewPack";

export enum ROUTS {
    DEFAULT = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    EMAIL_CONFIRMATION = '/email_confirmation',
    PROFILE = '/profile',
    NOT_FOUND = '404',
    PASS_RECOVERY = '/password_recovery',
    NEW_PASS = '/createNewPassword',
    // изменила
    //NEW_PASS = '/createNewPassword/:token',
    PACKS = '/packs',
    CARDS = '/cards',
    ADD_NEW_PACK = '/add_new_pack',
    TEST_PAGE = '/test',
    FRIENDS_PACKS = '/friends_packs',
    MY_PACKS = '/my_packs',
}

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return (
            <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }


    return (
        <div className="App">
            <Header />
            <RoutesNavLink />
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
            <Routes>
                <Route path={ROUTS.DEFAULT} element={<Profile/>}/>
                <Route path={ROUTS.PROFILE} element={<Profile/>}/>
                <Route path={ROUTS.LOGIN} element={<Login/>}/>
                <Route path={ROUTS.REGISTRATION} element={<Registration/>}/>
                <Route path={ROUTS.EMAIL_CONFIRMATION} element={<EmailConfirmation/>}/>
                <Route path={ROUTS.NOT_FOUND} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                <Route path={ROUTS.PASS_RECOVERY} element={<PassRecovery/>}/>
                <Route path={ROUTS.NEW_PASS} element={<CreateNewPassword/>}/>
                <Route path={ROUTS.PACKS} element={<Packs/>}/>
                <Route path={ROUTS.CARDS} element={<Cards/>}/>
                <Route path={ROUTS.ADD_NEW_PACK} element={<NewPack/>}/>
                <Route path={ROUTS.FRIENDS_PACKS} element={<FriendsPack/>}/>
                {/*<Route path={ROUTS.MY_PACKS} element={<MyPack/>}/>*/}
                <Route path={ROUTS.TEST_PAGE} element={<Test/>}/>
                <Route path={ROUTS.NOT_FOUND} element={<Navigate to={ROUTS.NOT_FOUND}/>}/>
            </Routes>
            </Container>
        </div>
    );
}

export default App;
