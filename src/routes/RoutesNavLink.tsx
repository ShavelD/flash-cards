import {NavLink} from "react-router-dom";
import s from "./RoutesNavLink.module.css"
import {ROUTS} from "../App";

export const RoutesNavLink = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={ROUTS.PROFILE}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <a>Profile</a>
                </NavLink></div>
            <div>
                <NavLink to={ROUTS.TEST_PAGE}
                         className={(navData) => navData.isActive ? s.active : s.item}><a>Test</a></NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.DEFAULT}
                         className={(navData) => navData.isActive ? s.active : s.item}><a>Main</a></NavLink></div>
            <div>
                <NavLink to={ROUTS.LOGIN} className={(navData) => navData.isActive ? s.active : s.item}><a>Login</a></NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.REGISTRATION}
                         className={(navData) => navData.isActive ? s.active : s.item}><a>Registration</a></NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.PASS_RECOVERY} className={(navData) => navData.isActive ? s.active : s.item}><a>Password
                    recovery</a></NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.NEW_PASS} className={(navData) => navData.isActive ? s.active : s.item}><a>New
                    password</a></NavLink>
            </div>
        </nav>
    )
}