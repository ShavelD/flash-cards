import React from 'react';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import {Test} from "./components/Test/Test";
import {Registration} from "./features/registration/Registration";
import {CreateNewPassword} from "./features/new-pass/CreateNewPassword";
import {Main} from "./components/Main/Main";
import {Profile} from "./components/Profile/Profile";
import {PassRecovery} from "./features/pass-recovery/PassRecovery";
import {RoutesNavLink} from "./routes/RoutesNavLink";
import {Header} from "./components/Header/Header";
import {Container} from "@mui/material";
import {Login} from "./components/Login/LoginMain";




export enum ROUTS {
    DEFAULT = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    NOT_FOUND = '404',
    PASS_RECOVERY = '/password_recovery',
    NEW_PASS = '/createNewPassword',
    TEST_PAGE = '/test',
}

function App() {
    return (
        <div className="App">
            <Header />
            <RoutesNavLink />
            <Container fixed>
            <Routes>
                <Route path={ROUTS.DEFAULT} element={<Main/>}/>
                <Route path={ROUTS.LOGIN} element={<Login/>}/>
                <Route path={ROUTS.REGISTRATION} element={<Registration/>}/>
                <Route path={ROUTS.PROFILE} element={<Profile/>}/>
                <Route path={ROUTS.NOT_FOUND} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                <Route path={ROUTS.PASS_RECOVERY} element={<PassRecovery/>}/>
                <Route path={ROUTS.NEW_PASS} element={<CreateNewPassword/>}/>
                <Route path={ROUTS.TEST_PAGE} element={<Test/>}/>
                <Route path={'*'} element={<Navigate to={ROUTS.NOT_FOUND}/>}/>
            </Routes>
            </Container>
        </div>
    );
}

export default App;
