import React, {useState} from 'react'
import style from './showPacksCards.module.css'
import {FilterButton} from "./FilterButton/filterButton";
import {packsOwn} from "../../../../common/enums/packsOwn";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/hook";
import {clearURLParams} from "../../../../common/utils/clearURLParams";


export const ShowPacksCards = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTitle, setActiveTitle] = useState('ALL')

    const userId = useAppSelector(state => state.profile._id);
    let packsOwnLS;

    if (searchParams.get('user_id') === null) {
        packsOwnLS = packsOwn.ALL;
    } else if (searchParams.get('user_id') === userId) {
        packsOwnLS = packsOwn.MY;
    } else packsOwnLS = packsOwn.USER;

     const onClickButton = (buttonName: packsOwn): void => {
        const queryParams: { user_id?: string } = {};

        if (buttonName === packsOwn.MY) {
            queryParams.user_id = userId;
        } else searchParams.delete('user_id');

        clearURLParams(['page', 'min', 'max'], searchParams);

        setSearchParams({
            ...Object.fromEntries(searchParams),
            ...queryParams,
        });
    };


    return (
        <div className={style.wrapper}>
            <div className={style.text}>Show packs cards</div>
            <div className={style.buttons}>
                <FilterButton activeTitle={activeTitle} setActiveTitle={setActiveTitle} title={packsOwn.MY}
                              key={packsOwn.MY} onClickButton={onClickButton}
                              packsOwnLS={packsOwnLS}/>
                <FilterButton activeTitle={activeTitle} setActiveTitle={setActiveTitle} title={packsOwn.ALL}
                              key={packsOwn.ALL} onClickButton={onClickButton}
                              packsOwnLS={packsOwnLS}/>
            </div>
        </div>
    )
}