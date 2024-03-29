import {NavLink} from "react-router-dom";
import s from "./RoutesNavLink.module.css"
import {ROUTS} from "../../App";


export const RoutesNavLink = () => {
    return (
        <nav className={s.nav}>
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
            <div>
                <NavLink to={ROUTS.PROFILE}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    Profile
                </NavLink></div>
            <div>
                <NavLink to={ROUTS.PACKS}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    Packs
                </NavLink></div>
            <div>
                <NavLink to={ROUTS.CARDS}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    Cards
                </NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.ADD_NEW_PACK}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    New pack
                </NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.ADD_NEW_CARD}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    New card
                </NavLink>
            </div>
            <div>
                <NavLink to={ROUTS.LEARN_PACKS}
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    Learn to pack
                </NavLink>
            </div>
            {/*<div>*/}
            {/*<NavLink to={ROUTS.MY_PACKS}*/}
            {/*         className={(navData) => navData.isActive ? s.active : s.item}>*/}
            {/*    My Pack*/}
            {/*</NavLink></div>*/}
            {/*<div>*/}
            {/*    <NavLink to={ROUTS.TEST_PAGE}*/}
            {/*             className={(navData) => navData.isActive ? s.active : s.item}>Test</NavLink>*/}
            {/*</div>*/}
        </nav>
    )
}