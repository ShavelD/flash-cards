import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {PacksHeader} from "./paksCommons/packsHeader/packsHeader";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {
    changePageAC,
    changePageCountAC,
    changeSortPacksAC,
    getPacksTC,
    MainPackType
} from "../../redux/main-reducer";
import {Order, TableHeadMain} from '../../common/TebleHead/tablePackHead';
import {Paginator} from "../../common/Paginator/Paginator";
import IconButton from "@mui/material/IconButton";
import {SchoolOutlined} from "@mui/icons-material";
import {DeleteModalIcon} from "../Modals/Delere Pack Modal/DeleteModalIcon/DeleteModalIcon";
import {EditPackIcon} from "../Modals/Update Pack Modal/UpdatePackIcon/UpdatePackIcon";
import {TableRow} from "@mui/material";



type ColumnType = {
    id: '_id' | 'name' | 'updated' | 'user_id' | 'cardsCount' | 'created'
    label: string
    minWidth?: number
    align?: 'left'
    format?: (value: number) => string
}

const columns: ColumnType[] = [
    {id: 'name', label: 'Name', minWidth: 100},
    {id: 'cardsCount', label: 'Cards', minWidth: 100},
    {
        id: 'updated', label: 'Last Updated', minWidth: 170, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'user_id', label: 'Created by', minWidth: 170, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'created', label: 'Action', minWidth: 100, align: 'left',
        format: (value: number) => value.toFixed(2),
    },
];


export const Packs = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const packsCards = useAppSelector(state => state.main.packs)
    const cardPacksTotal = useAppSelector(state => state.main.cardPacksTotalCount)
    const userIdLogin = useAppSelector(state => state.auth.isLoggedIn)
    const profileId = useAppSelector(state => state.profile._id)
    const pageState = useAppSelector(state => state.main.queryParams.page)
    const packCountState = useAppSelector(state => state.main.queryParams.pageCount)


    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof MainPackType>('updated')
    const [searchParams, setSearchParams] = useSearchParams({pageCount: '5'})


    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MainPackType) => {
        if (property === 'user_id') {
            return
        }
        const isAsc = orderBy === property && order === 'asc'

        searchParams.set('sortPacks', (isAsc ? 0 : 1) + property)
        setSearchParams(searchParams)

        dispatch(changeSortPacksAC((isAsc ? 0 : 1) + property))
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, page: number) => {
        const newPage = page + 1
        searchParams.set('page', newPage.toString())
        setSearchParams(searchParams)
        dispatch(changePageAC(newPage))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('pageCount', event.target.value.toString())
        setSearchParams(searchParams)
        dispatch(changePageCountAC(+event.target.value))
    }

    let URLParam = useMemo(() => {
        const paramsSearch: any = {}

        searchParams.forEach((key, value) => {
            paramsSearch[value] = key
        })

        return paramsSearch
    }, [searchParams])

    useEffect(() => {
        let orderParam = searchParams.get('sortPacks')

        if (orderParam) {
            setOrderBy(orderParam.substring(1) as keyof MainPackType)
            setOrder(Number(orderParam.at(0)) ? 'asc' : 'desc')
        }
    }, [searchParams, order, orderBy])

    // let URLParams = useMemo(
    //     () => ({
    //         packName: searchParams.get('packName') || undefined,
    //         min: Number(searchParams.get('min')) || undefined,
    //         max: Number(searchParams.get('max')) || undefined,
    //         page: Number(searchParams.get('page')) || undefined,
    //         pageCount: Number(searchParams.get('pageCount')) || undefined,
    //         sortPacks: searchParams.get('sortPacks') || undefined,
    //     }),
    //     [searchParams]
    //

    const isMyPack = (id: string) => {
        return id === profileId
    }

    useEffect(() => {
        dispatch(getPacksTC(URLParam))
    }, [URLParam])

    const rows = packsCards

    const handleClick = (id_pack: string) => {
        navigate(`/packs/${id_pack}`)
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
                                orderBy={orderBy.toString()}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow hover tabIndex={-1} key={row._id}>
                                            <TableCell id={labelId} scope="row" onClick={() => handleClick(row._id)}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.cardsCount}</TableCell>
                                            <TableCell
                                                align="left">{new Date(row.updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="left">{row.user_name}</TableCell>
                                            <div>
                                                {!isMyPack(row.user_id) && (
                                                    <IconButton disabled={row.cardsCount === 0}>
                                                        <SchoolOutlined fontSize={'small'}/>
                                                    </IconButton>
                                                )}
                                            </div>
                                            {isMyPack(row.user_id) && (
                                                <>
                                                    <IconButton disabled={row.cardsCount === 0}>
                                                        <SchoolOutlined fontSize={'small'}/>
                                                    </IconButton>
                                                    <EditPackIcon id_pack={row._id} namePack={row.name}/>

                                                    <DeleteModalIcon id_pack={row._id} name={row.name}/>
                                                </>
                                            )}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paginator totalCount={cardPacksTotal}/>
                </Paper>
            </Box>
        </div>
    )
}