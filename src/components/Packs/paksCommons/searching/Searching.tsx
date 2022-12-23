import React, {ChangeEvent, useEffect, useState} from 'react'

import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton'
import style from './Search.module.css'
import {useAppSelector} from "../../../../hooks/hook";
import {useSearchParams} from "react-router-dom";
import {InputAdornment, OutlinedInput} from "@mui/material";
import {useDebounce} from "../../../../hooks/useDebounce";


type PropsType = {
    search: 'packName' | 'cardQuestion' | 'userName';
};

export const Searching: React.FC<PropsType> = ({ search }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string>(searchParams.get(search) || '');

    const debouncedValue = useDebounce<string>(value);
    const status = useAppSelector(state => state.app.status);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };
    const clearSearch = (): void => {
        setValue('');
    };

    useEffect(() => {
        const queryParams: { packName?: string; cardQuestion?: string; userName?: string } =
            {};

        if (debouncedValue) {
            queryParams[search] = debouncedValue;
            searchParams.delete('page');
            setSearchParams(searchParams);
        } else searchParams.delete(search);

        setSearchParams({
            ...Object.fromEntries(searchParams),
            ...queryParams,
        });
    }, [debouncedValue, search, setSearchParams]);

    return (
        <div className={style.wrapper}>
            <div className={style.text}>Search</div>
                <OutlinedInput
                    disabled={status === 'loading'}
                    className={style.inputBase}
                    value={value}
                    onChange={handleChange}
                    placeholder="Provide your text"
                    startAdornment={
                        <InputAdornment position="start" >
                            <SearchIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            {value && (
                                <IconButton size="small" onClick={clearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    }
                />
        </div>
    )
}