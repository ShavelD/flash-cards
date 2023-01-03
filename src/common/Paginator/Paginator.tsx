// import React, {useCallback, useEffect, useState} from 'react';
//
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import {Select, SelectChangeEvent} from '@mui/material';
// import MenuItem from '@mui/material/MenuItem/MenuItem';
// import Pagination from '@mui/material/Pagination';
// import {useSearchParams} from 'react-router-dom';
// import style from './Paginator.module.css'
//
//
// type PropsType = {
//     totalCount: number;
// };
//
// export const Paginator: React.FC<PropsType> = ({totalCount}) => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
//     const [pageCount, setPageCount] = useState<number>(
//         Number(searchParams.get('pageCount')) || 5,
//     );
//
//     const pagesCount = Math.ceil(totalCount / pageCount);
//
//     const handleChange = useCallback(
//         (event: React.ChangeEvent<unknown>, value: number): void => {
//             const queryParams: { page?: string } = {};
//
//             if (value !== 1) {
//                 queryParams.page = String(value);
//             } else {
//                 searchParams.delete('page');
//                 setSearchParams(searchParams);
//             }
//
//             setPage(value);
//
//             setSearchParams({
//                 ...Object.fromEntries(searchParams),
//                 ...queryParams,
//             });
//         },
//         [searchParams, setSearchParams],
//     );
//
//     const onSelectClickHandler = useCallback(
//         (event: SelectChangeEvent<number>): void => {
//             const queryParams: { pageCount?: string } = {};
//
//             queryParams.pageCount = String(event.target.value);
//             setPageCount(+event.target.value);
//             setSearchParams({
//                 ...Object.fromEntries(searchParams),
//                 ...queryParams,
//             });
//         },
//         [searchParams, setSearchParams],
//     );
//
//     useEffect(() => {
//         setPage(Number(searchParams.get('page')) || 1);
//     }, [searchParams]);
//
//     return (
//         <div className={style.container}>
//             <Pagination count={pagesCount} page={page} onChange={handleChange}/>
//             <p className={style.text}>Show</p>
//
//             <Select
//                 className={style.select}
//                 size="small"
//                 value={pageCount}
//                 onChange={onSelectClickHandler}
//                 IconComponent={KeyboardArrowDownIcon}
//             >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//                 <MenuItem value={100}>100</MenuItem>
//             </Select>
//             <p className={style.text}>Cards per Page</p>
//         </div>
//     );
// };


import React, { FC } from 'react'
import styles from './Paginator.module.css'
import Select from '../Select/Select'

type PropsType = {
    onPageChanged: (page: number) => void
    totalCount: number
    currentPage: number
    pageSize: number
    changePageSize?: (pageCount: string) => void
    optionsPageSize?: string[]
}

export const Pagination: FC<PropsType> = ({
                                              onPageChanged,
                                              totalCount,
                                              pageSize,
                                              currentPage,
                                              changePageSize,

                                              optionsPageSize,
                                          }) => {
    let isEnd = false
    let isStart = true
    let firstPageIdx = 1
    let lastPageIdx = 5

    const pages: number[] = []
    const pageCount = Math.ceil(totalCount / pageSize)
    for (let i = 0; i <= pageCount; i++) {
        pages.push(i)
    }

    if (currentPage - 3 >= 1) {
        firstPageIdx = currentPage - 2
        isStart = false
    }
    if (currentPage - 3 >= 1) {
        lastPageIdx = currentPage + 2
    }
    if (currentPage + 3 > pageCount) {
        firstPageIdx = pageCount - 4
        isEnd = true
    }
    const slicedPages = pages.slice(firstPageIdx, lastPageIdx + 1)

    const onPreviousChangedHandler = () => {
        onPageChanged(currentPage - 1)
    }
    const onNextChanged = () => {
        onPageChanged(currentPage + 1)
    }
    const onLastChangedHandler = () => {
        onPageChanged(pageCount)
    }
    const onFirstChangedHandler = () => {
        onPageChanged(1)
    }

    const selectOptions = optionsPageSize ? optionsPageSize : [`${pageSize}`, '10', '15', '20']

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.previousBtn} ${styles.arrow}`}
                onClick={onPreviousChangedHandler}
                disabled={currentPage === 1}
                type={'button'}
            />

            <button
                className={`${styles.defaultBtnPage} ${styles.firstPage}`}
                onClick={onFirstChangedHandler}
                hidden={isStart}
                type={'button'}
            >
                1
            </button>

            <span className={styles.points} hidden={isStart}>
        ...
      </span>

            <span className={styles.slicedPages}>
        {slicedPages.map((page, i) => {
            const onPageChangedHandler = () => {
                onPageChanged(page)
            }
            const isSelectedPage = page === currentPage
            return (
                <button
                    key={i}
                    className={`${styles.defaultBtnPage} ${isSelectedPage ? styles.selectedPage : ''}`}
                    type={'button'}
                    disabled={isSelectedPage}
                    onClick={onPageChangedHandler}
                >
                    {page}
                </button>
            )
        })}
      </span>

            <span className={styles.points} hidden={isEnd}>
        ...
      </span>

            <button
                className={`${styles.defaultBtnPage} ${styles.lastPage}`}
                onClick={onLastChangedHandler}
                hidden={isEnd}
                type={'button'}
            >
                {pageCount ? pageCount : ''}
            </button>

            <button
                onClick={onNextChanged}
                className={`${styles.nextBtn} ${styles.arrow}`}
                disabled={currentPage === pageCount}
                type={'button'}
            />

            {changePageSize && (
                <span className={styles.pageCount}>
          Show <Select options={selectOptions} value={pageSize} onChangeOption={changePageSize} />{' '}
                    Cards per Page
        </span>
            )}
        </div>
    )
}