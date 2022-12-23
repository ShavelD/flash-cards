import * as React from 'react';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import {useNavigate, useSearchParams} from "react-router-dom";
// import {useEffect} from "react";
// import {useAppDispatch} from "../../../hooks/hook";
// import {PacksHeader} from "../paksCommons/packsHeader/packsHeader";
// import {TableHeadMain} from "../../../common/TebleHead/tableHead";
//
//
//
//
// type ColumnType = {
//     id: '_id' | 'question' | 'answer' | 'updated' | 'grade'
//     label: string
//     minWidth?: number
//     align?: 'right'
//     format?: (value: number) => string
// }
//
// const columns: ColumnType[] = [
//     {id: 'question', label: 'Question', minWidth: 100},
//     {id: 'answer', label: 'Answer', minWidth: 100},
//     {id: 'updated', label: 'Last Updated', minWidth: 170, align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),},
//     {id: 'grade', label: 'Grade', minWidth: 170, align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),},
// ];
//
//
// export const FriendsPack = () => {
//
//     const dispatch = useAppDispatch()
//     let navigate = useNavigate()
//
//
//
//
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
//                             <TableHeadMain
//                                 columnsHead={columns}
//                                 onRequestSort={handleRequestSort}
//                                 order={order}
//                                 orderBy={orderBy}
//                                 rowCount={rows.length}
//                             />
//                             <TableBody>
//                                 {rows.map((row, index) => {
//                                     const labelId = `enhanced-table-checkbox-${index}`
//
//                                     return (
//                                         <TableRow hover tabIndex={-1} key={row._id}
//                                                   onClick={() => handleClick(row._id)}>
//                                             <TableCell id={labelId} scope="row">
//                                                 {row.name}
//                                             </TableCell>
//                                             <TableCell align="right">{row.cardsCount}</TableCell>
//                                             <TableCell
//                                                 align="right">{new Date(row.updated).toLocaleDateString()}</TableCell>
//                                             <TableCell align="right">{row.created}</TableCell>
//                                         </TableRow>
//                                     )
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
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