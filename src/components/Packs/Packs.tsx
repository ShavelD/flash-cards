import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PacksHeader} from "./paksCommons/packsHeader/packsHeader";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {changePageAC, changeSortPacksAC, getCardsTC, getPacksTC, MainPackType} from "../../redux/main-reducer";
import {Order, TableHeadMain} from '../../common/TebleHead/tableHead';



type ColumnType = {
    id: '_id' | 'name' | 'updated' | 'user_id' | 'cardsCount' | 'created'
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
}

const columns: ColumnType[] = [
    {id: 'name', label: 'Name', minWidth: 100},
    {id: 'cardsCount', label: 'Cards', minWidth: 100},
    {id: 'updated', label: 'Last Updated', minWidth: 170, align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),},
    {id: 'user_id', label: 'Created by', minWidth: 170, align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),},
    {id: 'created', label: 'Action', minWidth: 100, align: 'right',
        format: (value: number) => value.toFixed(2),},
];


export const Packs = () => {

    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePageAC(+event.target.value))
    };

    const packsCards = useAppSelector(state => state.main.packs)
    const pageState = useAppSelector(state => state.main.page)
    const packCountState = useAppSelector(state => state.main.pageCount)
    const cardPacksTotal = useAppSelector(state => state.main.cardPacksTotalCount)
    const userIdLogin = useAppSelector(state => state.auth.isLoggedIn)
    const sortPacksUse = useAppSelector(state => state.main.sortPacks)
    const minValue = useAppSelector(state => state.main.minCardsCount)
    const maxValue = useAppSelector(state => state.main.maxCardsCount)

    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof MainPackType>('updated')

    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        pageCount: '5',
    })

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MainPackType) => {
        if (property === 'user_id') {
            return
        }
        const isAsc = orderBy === property && order === 'asc'

        searchParams.set('sortPacks', (isAsc ? 1 : 0) + property)
        dispatch(changeSortPacksAC((isAsc ? 1 : 0) + property))
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, page: number) => {
        const newPage = page + 1
        searchParams.set('page', newPage.toString())
        dispatch(changePageAC(newPage))
    };

    useEffect(() => {
        setSearchParams(searchParams)
        dispatch(getPacksTC())
    }, [pageState, packCountState, sortPacksUse, minValue, maxValue])

    const rows = packsCards

    const handleClick = (id_cards: string) => {
        navigate(`/cards/${id_cards}`)
        dispatch(getCardsTC(id_cards))
    }

    return (
        <div>
            <PacksHeader/>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                        >
                            <TableHeadMain
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
                                        <TableRow hover tabIndex={-1} key={row._id}
                                                  onClick={() => handleClick(row._id)}>
                                            <TableCell id={labelId} scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.cardsCount}</TableCell>
                                            <TableCell
                                                align="right">{new Date(row.updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="right">{row.created}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={cardPacksTotal}
                        rowsPerPage={packCountState}
                        page={pageState ? pageState - 1 : 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    )
}