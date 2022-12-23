import * as React from 'react';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import {TableHead} from "@mui/material";
// import {PacksHeader} from "./paksCommons/packsHeader/packsHeader";
// import {useAppDispatch, useAppSelector} from "../../hooks/hook";
// import {useNavigate} from "react-router-dom";
// import {changePage, fetchPacksTC} from "../../redux/packs-reducer";
// import {useEffect} from "react";
// import {fetchCardsTC} from "../../redux/cards-reducer";
// import style from "./myPack.module.css"
//
//
// interface Data {
//     name: string
//     cards: number
//     last_updated: string
//     created_by: string
//     action: string
// }
//
// function createData(
//     name: string,
//     cards: number,
//     last_updated: string,
//     created_by: string,
//     action: string,
// ): Data {
//     return {
//         name,
//         cards,
//         last_updated,
//         created_by,
//         action,
//
//     };
// }
//
// const rows = [
//     createData('Pack Name', 4, "18.03.2021", "Ivan Ivanov", ''),
//
// ];
//
//
// type ColumnType = {
//     id: 'name' | 'updated' | 'user_name' | 'cardsCount' | '_id'
//     label: string
//     minWidth?: number
//     align?: 'right'
//     format?: (value: number) => string
// }
//
// const columns: readonly ColumnType[] = [
//     {id: 'name', label: 'Name', minWidth: 170},
//     {id: 'cardsCount', label: 'Cards', minWidth: 100},
//     {id: 'updated', label: 'Last Updated', minWidth: 170, align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),},
//     {id: 'user_name', label: 'Created by', minWidth: 170, align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),},
//     {id: '_id', label: 'Action', minWidth: 170, align: 'right',
//         format: (value: number) => value.toFixed(2),},
// ];
//
//
// export const MyPack = () => {
//
//     const dispatch = useAppDispatch()
//     let navigate = useNavigate()
//
//
//     const handleChangePage = (event: unknown, page: number) => {
//         const newPage = page + 1
//         dispatch(changePage(newPage))
//     };
//
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         dispatch(changePage(+event.target.value))
//     };
//
//     // const packsCards = useAppSelector(state => state.packs.cardPacks)
//     // const pageState = useAppSelector(state => state.packs.page)
//     // const packCountState = useAppSelector(state => state.packs.pageCount)
//     // const cardPacksTotal = useAppSelector(state => state.packs.cardPacksTotalCount)
//     //
//     // useEffect(() => {
//     //     dispatch(fetchPacksTC())
//     // }, [pageState, packCountState])
//     //
//     // const rows = packsCards
//
//     const handleClick = (id_cards: string) => {
//         console.log(id_cards)
//         navigate(`/cards/${id_cards}`)
//         dispatch(fetchCardsTC(id_cards))
//     }
//
//     return (
//         <div>
//             <PacksHeader/>
//             <Box sx={{width: '100%'}}>
//                 <Paper sx={{width: '100%', mb: 2}}>
//                     <TableContainer>
//                         <Table
//                             sx={{minWidth: 750}}
//                             aria-labelledby="tableTitle"
//                         >
//                             <TableHead className={style.tableTitle}>
//                                 <TableRow>
//                                     {columns.map(column => (
//                                         <TableCell
//                                             key={column.id}
//                                             align={column.align}
//                                             style={{minWidth: column.minWidth}}
//                                         >
//                                             {column.label}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows
//                                     // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map(row => {
//                                         return (
//                                             <TableRow
//                                                 hover
//                                                 role="checkbox"
//                                                 tabIndex={-1}
//                                                 key={row._id}
//                                                 onClick={() => handleClick(row._id)}
//                                             >
//                                                 {columns.map(column => {
//                                                     const value = row[column.id]
//
//                                                     return (
//                                                         <TableCell key={column.id} align={column.align}>
//                                                             {column.format && typeof value === 'number'
//                                                                 ? column.format(value)
//                                                                 : value}
//                                                         </TableCell>
//                                                     )
//                                                 })}
//                                             </TableRow>
//                                         )
//                                     })}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         // количество кат в колоде cardPacksTotalCount
//                         count={cardPacksTotal}
//                         rowsPerPage={packCountState}
//                         page={pageState ? pageState - 1 : 0}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Paper>
//             </Box>
//         </div>
//     )
// }