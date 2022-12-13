import {NavLink} from "react-router-dom";
import s from "./RoutesNavLink.module.css"
import {ROUTS} from "../App";

export const RoutesNavLink = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={ROUTS.PROFILE}
                         className={(navData) => navData.isActive ? s.active : s.item}>Profile</NavLink></div>
            <div>
                <NavLink to={ROUTS.TEST_PAGE}
                         className={(navData) => navData.isActive ? s.active : s.item}>Test</NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.DEFAULT}
                          className={(navData) => navData.isActive ? s.active : s.item}>Main</NavLink></div>
            <div>
                <NavLink to={ROUTS.LOGIN} className={(navData) => navData.isActive ? s.active : s.item}>Login</NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.REGISTRATION}
                          className={(navData) => navData.isActive ? s.active : s.item}>Registration</NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.PASS_RECOVERY} className={(navData) => navData.isActive ? s.active : s.item}>Password
                recovery</NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.NEW_PASS} className={(navData) => navData.isActive ? s.active : s.item}>New
                password</NavLink>
            </div>
        </nav>
    )
}