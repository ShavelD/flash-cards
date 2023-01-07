import React, {useState} from 'react';
import style from './filterButton.module.css'
import {packsOwn} from "../../../../../common/enums/packsOwn";


type PropsType = {
    packsOwnLS: packsOwn | null;
    title: packsOwn;
    onClickButton: (buttonName: packsOwn) => void;
    activeTitle:string
    setActiveTitle:(newStatus:string)=>void
};

export const FilterButton: React.FC<PropsType> = ({
                                                      title,
                                                      onClickButton,
                                                      activeTitle,
                                                      setActiveTitle,
                                                      packsOwnLS,
                                                  }) => {


    // const [ active, isActive] = useState(true)
    // let className = `${active && 'activeButton'} buttonClass`


    const onMy = style.filterButton + ' ' + (activeTitle === title ? style.active : '')

    const onClickButtonHandle = () =>{
        onClickButton(title);
        setActiveTitle(title)
    }

    return (
        <button onClick={onClickButtonHandle} className={onMy}>{title}</button>
    );
};

