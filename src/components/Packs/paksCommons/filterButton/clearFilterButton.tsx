import React from 'react'
import style from './clearFilterButton.module.css'
import {FilterAlt} from "@mui/icons-material";
import {clearURLParams} from "../../../../common/utils/clearURLParams";
import {useSearchParams} from "react-router-dom";


type PropsType = {
    params: Array<string>;
};

export const ClearFilterButton: React.FC<PropsType> = ({ params }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const clearParams = (): void => {
        clearURLParams(params, searchParams);
        setSearchParams(searchParams);
    };

    return (
        <div className={style.resetFiltersButton}>
            <button onClick={clearParams}><FilterAlt/></button>
        </div>
    )
}