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


import React, {ChangeEvent, useState} from 'react';
import left from "../../assets/images/left.png";
import reght from "../../assets/images/reght.png";
import style from './Paginator.module.css'


type PaginatorType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onChangePage: (page: number) => void
    onChangeShowItems: (value: number) => void
}

export const Paginator = (props: PaginatorType) => {
    let portionSize = 5
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        props.onChangeShowItems(Number(event.target.value))
    };

    return (
        <div className={style.wrapper}>
            <div className={style.pagesWrap}>
                <div className={style.chevron}
                     onClick={() => leftPortionPageNumber > 1 && setPortionNumber(portionNumber - 1)}><img src={left} width={'30px'}/></div>
                <div className={style.pagesBlock}>
                    {pages
                        .filter((p) =>
                            p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p, i) =>
                            props.currentPage === p ?
                                <button className={style.active}>{p}</button> :
                                <button onClick={() => props.onChangePage(p)} key={i}>{p}</button>
                        )}
                </div>
                <div className={style.chevron} onClick={() => setPortionNumber(portionNumber + 1)}><img src={reght} width={'30px'}/></div>
            </div>
            <div className={style.show}>
                <div>Show</div>
                <select onChange={handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div>Items per Page</div>
            </div>
        </div>
    )
}