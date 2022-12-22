import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import style from './Search.module.css'



export const Searching = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.text}>Search</div>
            <Paper component="form"
                   sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 32 }}
            >
                <IconButton type="button" aria-label="search" >
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Provide your text"
                    inputProps={{ 'aria-label': 'Provide your text' }}
                    className={style.inputBase}
                />
            </Paper>
        </div>
    )
}