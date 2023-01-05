import React from 'react';
import style from './filterButton.module.css'
import {packsOwn} from "../../../../../common/enums/packsOwn";


type PropsType = {
    packsOwnLS: packsOwn | null;
    title: packsOwn;
    onClickButton: (buttonName: packsOwn) => void;
};

export const FilterButton: React.FC<PropsType> = ({
                                                      title,
                                                      onClickButton,
                                                      packsOwnLS,
                                                  }) => {

    const onClickButtonHandle = (): void => onClickButton(title);

    return (
        <button onClick={onClickButtonHandle} className={style.filterButton}>{title}</button>
    );
};

