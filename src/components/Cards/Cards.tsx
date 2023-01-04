import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {getCardsTC, MainCardsType} from "../../redux/main-reducer";
import {Order, TableHeadCard} from "../../common/TebleHead/tableCardHead";
import {useEffect, useMemo, useState} from "react";
import {Paginator} from "../../common/Paginator/Paginator";
import {
    changeCardsPageAC,
    changeCardsPageCountAC,
    changeSortCardsAC,
    deleteCardTC,
    updateCardTC
} from "../../redux/cards-reducer";
import {CardsHeadMain} from "./CardsHeader/cardsHeader";


type ColumnType = {
    id: '_id' | 'question' | 'answer' | 'updated' | 'grade'
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
}

const columns: ColumnType[] = [
    {id: 'question', label: 'Question', minWidth: 170},
    {id: 'answer', label: 'Answer', minWidth: 100},
    {
        id: 'updated', label: 'Last Updated', minWidth: 170, align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'grade', label: 'Grade', minWidth: 170, align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },

];

export const Cards = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userIdLogin = useAppSelector(state => state.auth.isLoggedIn)
    const rows = useAppSelector(state => state.main.cards)
    const cardsTotalCount = useAppSelector(state => state.cars.cardsTotalCount)
    const cardsPageCount = useAppSelector(state => state.cars.pageCount)
    const cardPage = useAppSelector(state => state.cars.page)
    const sortCards = useAppSelector(state => state.cars.sortCards)

    const {id_pack} = useParams()

    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof MainCardsType>('question')
    const [searchParams, setSearchParams] = useSearchParams({
        pageCount: '5',
    })

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MainCardsType) => {
        if (property === 'cardsPack_id') {
            return
        }
        const isAsc = orderBy === property && order === 'asc'

        searchParams.set('sortCards', (isAsc ? 1 : 0) + property)
        dispatch(changeSortCardsAC((isAsc ? 1 : 0) + property))
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    // const handleChangePage = (event: unknown, page: number) => {
    //     const newPage = page + 1
    //     searchParams.set('page', newPage.toString())
    //     dispatch(changeCardsPageAC(newPage))
    // }

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     searchParams.set('pageCount', event.target.value.toString())
    //     dispatch(changeCardsPageCountAC(+event.target.value))
    // }

    // choose card
    const handleClick = (id_pack: string, id_card: string) => {
        navigate(`/packs/pack/${id_pack}/card/${id_card}`)
    }


    // const deleteCard = (id_pack: string, id_card: string) => {
    //     dispatch(deleteCardTC(id_pack, id_card))
    // }
    // const updateCard = (id_pack: string, id_card: string) => {
    //     dispatch(updateCardTC(id_pack, { _id: id_card ? id_card : '', question: 'Updated' }))
    // }

    // useEffect(() => {
    //   setSearchParams(searchParams)
    //
    //   dispatch(
    //     getCardsTC({
    //       cardsPack_id: id_pack ? id_pack : '',
    //       page: paramsSearch.page,
    //       pageCount: paramsSearch.pageCount,
    //       sortCards: paramsSearch.sortCards,
    //     })
    //   )
    // }, [cardPage, cardsPageCount, sortCards])

    let URLParams = useMemo(
        () => ({
            cardsPack_id: id_pack ? id_pack : '',
            // page: Number(searchParams.get('page')) || undefined,
            // pageCount: Number(searchParams.get('pageCount')) || undefined,
            // sortCards: searchParams.get('sortCards') || undefined,
            // cardQuestion: searchParams.get('cardQuestion') || undefined,
        }),
        [searchParams, id_pack]
    )
    useEffect(() => {
        dispatch(getCardsTC(URLParams))
    }, [URLParams])

    return (
        <div>
            <CardsHeadMain/>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                        >
                            <TableHeadCard
                                columnsHead={columns}
                                onRequestSort={handleRequestSort}
                                order={order}
                                orderBy={orderBy}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow hover tabIndex={-1} key={row._id}>
                                            <TableCell id={labelId} scope="row"
                                                onClick={() => handleClick(row.cardsPack_id, row._id)}
                                            >
                                                {row.question}
                                            </TableCell>
                                            <TableCell align="right">{row.answer}</TableCell>
                                            <TableCell
                                                align="right">{new Date(row.updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="right">{row.grade}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    )
}