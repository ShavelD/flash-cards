import React, {useCallback, useEffect, useState} from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Pagination, Select, SelectChangeEvent} from '@mui/material';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import {useSearchParams} from 'react-router-dom';
import style from './Paginator.module.css'
import {useAppSelector} from "../../hooks/hook";


type PropsType = {
    totalCount: number;
};

export const Paginator: React.FC<PropsType> = ({totalCount}) => {
    // const pageCount = useAppSelector(state => state.cars.pageCount)
    // const pageSize = useAppSelector(state => state.cars.page)
    // const currentPage = useAppSelector(state => state.cars.currentPage)

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [pageCount, setPageCount] = useState<number>(
        Number(searchParams.get('pageCount')) || 5,
    );


    // const pageCount = useAppSelector(state => state.main.pageCount)


    const pagesCount = Math.ceil(totalCount / pageCount);

    const handleChange = useCallback(
        (event: React.ChangeEvent<unknown>, value: number): void => {
            const queryParams: { page?: string } = {};

            if (value !== 1) {
                queryParams.page = String(value);
            } else {
                searchParams.delete('page');
                setSearchParams(searchParams);
            }

            setPage(value);

            setSearchParams({
                ...Object.fromEntries(searchParams),
                ...queryParams,
            });
        },
        [searchParams, setSearchParams],
    );

    const onSelectClickHandler = useCallback(
        (event: SelectChangeEvent<number>): void => {
            const queryParams: { pageCount?: string } = {};

            queryParams.pageCount = String(event.target.value);
            setPageCount(+event.target.value);
            setSearchParams({
                ...Object.fromEntries(searchParams),
                ...queryParams,
            });
        },
        [searchParams, setSearchParams],
    );

    useEffect(() => {
        setPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    return (
        <div className={style.container}>




            <Pagination count={pagesCount} page={page} onChange={handleChange} />
            {/*<PaginatorNew/>*/}





            <p className={style.text}>Show</p>

            <Select
                className={style.select}
                size="small"
                value={pageCount}
                onChange={onSelectClickHandler}
                IconComponent={KeyboardArrowDownIcon}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
            <p className={style.text}>Cards per Page</p>
        </div>
    );
};