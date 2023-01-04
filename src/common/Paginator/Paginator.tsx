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