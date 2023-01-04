import React, { useEffect } from 'react'
import style from './PacksTable.module.css'
import { Navigate } from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../hooks/hook'
import {fetchPacksTC, getPacksTC, showItemsPerPageTC} from "../../redux/packs-reducer";
import {PacksBody} from "./packsTable/PacksBody";
import {Paginator} from "../../common/Paginator/Paginator";


export const Packs = () => {
    const dispatch = useAppDispatch()
    const isInit = useAppSelector((state) => state.auth.isLoggedIn)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)
    console.log(cardPacks)
    const page = useAppSelector((state) => state.packs.page)
    const pageCount = useAppSelector((state) => state.packs.pageCount)
    const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)


    useEffect(() => {
       // debugger
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchPacksTC())
    }, [isLoggedIn])

    const onChangeShowItems = (pageCount: number) => {
        dispatch(showItemsPerPageTC(pageCount))
    }

    const onChangePageHandler = (page: number) => {
        dispatch(getPacksTC(page))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/'} />
    }
    if (!isInit) {
        // return <Preloader />
    }

    return (
        <div className={style.wrapper}>
            {/*<div>*/}
            {/*  <SettingsBar />*/}
            {/*</div>*/}

            <table className={style.allTable}>
                <thead className={style.tableHead}>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last updated</th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cardPacks.map(pack => {
                    return (
                        <PacksBody
                            key={pack._id}
                            packId={pack._id}
                            name={pack.name}
                            cards={pack.cardsCount}
                            updated={pack.updated}
                            created={pack.user_name}
                            packUserId={pack.user_id}
                        />
                    )
                })}
                </tbody>
            </table>

            <Paginator
                totalItemsCount={totalPacksCount}
                pageSize={pageCount}
                currentPage={page}
                onChangePage={onChangePageHandler}
                onChangeShowItems={onChangeShowItems}
            />
        </div>
    )
}




