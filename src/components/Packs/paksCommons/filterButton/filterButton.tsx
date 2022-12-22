import React from 'react'
import s from './filterButton.module.css'
import {FilterAlt} from "@mui/icons-material";



export const FilterButton = () => {
    return (
        <div className={s.resetFiltersButton}>
            <button><FilterAlt/></button>
        </div>
    )
}