import React, {useState} from 'react';
import style from './Paginator.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {currentPageTC} from "../../redux/cards-reducer";



export const PaginatorNew = () => {

    // const dispatch = useAppDispatch()
    // const cardTotalCount = useAppSelector(state => state.main.cardPacksTotalCount)
    // const pageCount = useAppSelector(state => state.main.pageCount)
    // const currentPage = useAppSelector(state => state.main.page)
    //
    // let portionSize = 5
    // let pagesCount = Math.ceil(cardTotalCount / pageCount);
    //
    // let pages = []
    //
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }
    //
    //
    //
    // let portionCount = Math.ceil(pagesCount / portionSize);
    //
    // let [portionNumber, setPortionNumber] = useState(1);
    // let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    // let rightPortionPageNumber = portionNumber * portionSize;
    //
    //
    // const onPageChanges = (page: number) => {
    //     dispatch(currentPageTC(page))
    // }
    //
    // return (
    //     <div className={style.paginator}>
    //
    //
    //
    //         {
    //             portionNumber > 1 &&
    //             <button onClick={() => {
    //                 setPortionNumber(portionNumber - 1)
    //             }}>PREV</button>
    //         }
    //
    //         {pages
    //             .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
    //             .map((el, index) => {
    //                 return (
    //                     currentPage === el?
    //                         <button className={style.active}>{el}</button> :
    //                         <button onClick={(e) => {
    //                                       onPageChanges(el);
    //                                    }} key={index}>{el}</button>
    //                 )
    //             })}
    //         {
    //             portionCount > portionNumber &&
    //             <button onClick={() => {
    //                 setPortionNumber(portionNumber + 1)
    //             }}>NEXT</button>
    //         }
    //
    //
    //     </div>
    // );

    const dispatch = useAppDispatch()
     const pageCount = useAppSelector(state => state.cars.pageCount)
     const pageSize = useAppSelector(state => state.cars.page)
     const currentPage = useAppSelector(state => state.cars.currentPage)

    let pagesCount = Math.ceil(pageCount / pageSize)
    let pages = [];

     for (let i=1; i <= pagesCount; i++){
         pages.push(i)
     }

     const onPageChanges = (pageNumber:number) => {
       dispatch(currentPageTC(pageNumber))
     }

    return(

        <div>
            {pages.map((el)=>{
                return(
                    <span className={currentPage === el ? style.selectedPage : style.selectedPagePadding}
                          onClick={(e) => {
                              onPageChanges(el)
                          }}>{el}</span>

                )
            })}
        </div>
    )
};

