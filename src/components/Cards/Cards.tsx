import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {getCardsTC, MainCardsType} from "../../redux/main-reducer";
import {Order, TableHeadCard} from "../../common/TebleHead/tableCardHead";
import {useEffect, useMemo, useState} from "react";
import {CardsHeadMain} from "./CardsHeader/cardsHeader";
import {Rating} from "@mui/material";
import {EditCardIcon} from "../../common/EditCardIcon/EditCardIcon";
import {DeleteModalIcon} from "../Modals/Delere Card Modal/DeleteModalIcon/DeleteModalIcon";
import {SchoolOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {ROUTS} from "../../App";
import {Paginator} from "../../common/Paginator/Paginator";


type ColumnType = {
    id: '_id' | 'question' | 'answer' | 'updated' | 'grade'
    label: string
    minWidth?: number
    align?: 'left'
    format?: (value: number) => string
}

const columns: ColumnType[] = [
    {id: 'question', label: 'Question', minWidth: 170},
    {id: 'answer', label: 'Answer', minWidth: 100},
    {
        id: 'updated', label: 'Last Updated', minWidth: 170, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'grade', label: 'Grade', minWidth: 170, align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: '_id',
        label: 'Action',
        minWidth: 30,
        align: 'left',
    },
];

export const Cards = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const rows = useAppSelector(state => state.main.cards)
    const profileId = useAppSelector(state => state.profile._id)
    const totalPacksCount = useAppSelector(state => state.main.cardPacksTotalCount)


    const {id_pack} = useParams()

    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof MainCardsType>('question')
    const [searchParams, setSearchParams] = useSearchParams()

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MainCardsType) => {
        const isAsc = orderBy === property && order === 'asc'

        searchParams.set('sortCards', (isAsc ? 0 : 1) + property)
        setSearchParams(searchParams)

        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const isMyCard = (id: string) => {
        return id === profileId
    }

    // choose card
    // const handleClick = (id_pack: string, id_card: string) => {
    //     navigate(`/packs/pack/${id_pack}/card/${id_card}`)
    // }

    const handleLearnClick = () => {
        if (id_pack) navigate(`/question/${id_pack}`)
        console.log('RENDER')
    }

    let URLParams = useMemo(
        () => ({
            cardsPack_id: id_pack ? id_pack : '',
            page: Number(searchParams.get('page')) || undefined,
            pageCount: Number(searchParams.get('pageCount')) || undefined,
            sortCards: searchParams.get('sortCards') || undefined,
            cardQuestion: searchParams.get('cardQuestion') || undefined,
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
                                                       // onClick={() => handleClick(row.cardsPack_id, row._id)}
                                            >
                                                {row.question}
                                            </TableCell>
                                            <TableCell align="left">{row.answer}</TableCell>
                                            <TableCell
                                                align="left">{new Date(row.updated).toLocaleDateString()}</TableCell>
                                            <TableCell align="left">{<Rating name="read-only" value={row.grade}
                                                                             readOnly/>}</TableCell>
                                            {isMyCard(row.user_id) && (
                                                <TableCell align="left">
                                                    <div>
                                                        <EditCardIcon
                                                            id_pack={row.cardsPack_id}
                                                            id_card={row._id}
                                                            cardQuestion={row.question}
                                                            cardAnswer={row.answer}
                                                        />
                                                        <DeleteModalIcon
                                                            id_pack={row.cardsPack_id}
                                                            id_card={row._id}
                                                            name={row.question}
                                                        />
                                                    </div>
                                                </TableCell>
                                            )}
                                            {!isMyCard(row.user_id) && (
                                                <TableCell align="left">
                                                    <IconButton>
                                                        <SchoolOutlined onClick={handleLearnClick} fontSize={'small'}/>
                                                    </IconButton>
                                                </TableCell>
                                            )}
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