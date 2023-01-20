import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {PacksHeader} from "./paksCommons/packsHeader/packsHeader";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {
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
import defAva from "../../assets/images/Avatar.jpg";


type ColumnType = {
    id: '_id' | 'name' | 'updated' | 'user_id' | 'cardsCount' | 'created' | 'deckCover'
    label: string
    minWidth?: number
    align?: 'left'
    format?: (value: number) => string
}

const columns: ColumnType[] = [
    {id: 'deckCover', label: '', minWidth: 30},
    {id: 'name', label: 'Name', minWidth: 100},
    {id: 'cardsCount', label: 'Cards', minWidth: 100},
    {
        id: 'updated', label: 'Last Updated', minWidth: 150, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'user_id', label: 'Created by', minWidth: 150, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'created', label: 'Action', minWidth: 50, align: 'left',
    },
];


export const Packs = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const packsCards = useAppSelector(state => state.main.packs)
    const totalPacksCount = useAppSelector(state => state.main.cardPacksTotalCount)
    const profileId = useAppSelector(state => state.profile._id)

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

    const handleLearnClick = (id_pack: string) => {
        if (id_pack) navigate(`/question/${id_pack}`)
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
                                            <TableCell id={labelId} scope="row">
                                                <img src={row.deckCover ? row.deckCover : defAva} alt='PackCover'
                                                     style={{height: '60px'}}/>
                                            </TableCell>
                                            <TableCell id={labelId} scope="row" onClick={() => handleClick(row._id)}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.cardsCount}</TableCell>
                                            <TableCell
                                                align="left">{new Date(row.updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="left">{row.user_name}</TableCell>
                                            <TableCell align="left">
                                            {!isMyPack(row.user_id) ?
                                                <IconButton disabled={row.cardsCount === 0}>
                                                    <SchoolOutlined onClick={() => handleLearnClick(row._id)}
                                                                    fontSize={'small'}/>
                                                </IconButton>
                                                : <>
                                                    <IconButton disabled={row.cardsCount === 0}>
                                                        <SchoolOutlined onClick={() => handleLearnClick(row._id)}
                                                                        fontSize={'small'}/>
                                                    </IconButton>
                                                    <EditPackIcon id_pack={row._id} namePack={row.name}/>
                                                    <DeleteModalIcon id_pack={row._id} name={row.name}/>
                                                </>}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paginator totalItemsCount={totalPacksCount}/>
                </Paper>
            </Box>
        </div>
    )
}