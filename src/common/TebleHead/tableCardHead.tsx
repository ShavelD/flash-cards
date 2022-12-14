import * as React from 'react'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import {visuallyHidden} from '@mui/utils'
import {MainCardsType, MainPackType} from "../../redux/main-reducer";


export type Order = 'asc' | 'desc'

export interface Column {
    id: keyof MainCardsType
    label: string
    minWidth?: number
    align?: 'left'
}

interface TableHeadCardProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MainCardsType) => void
    order: Order
    orderBy: string
    rowCount: number
    columnsHead: Column[]
}

export const TableHeadCard = (props: TableHeadCardProps) => {
    const {order, orderBy, onRequestSort, columnsHead} = props

    const sortHandler = (property: keyof MainCardsType) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {columnsHead.map(column => (
                    <TableCell
                        key={column.id}
                        padding={'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                        sx={{
                            backgroundColor: '#EFEFEF',
                            textAlign: 'left',
                            fontFamily: 'Montserrat',
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={sortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}