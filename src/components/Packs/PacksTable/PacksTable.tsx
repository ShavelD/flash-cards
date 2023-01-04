import React from 'react'
import style from '../Packs.module.css'
import teacher from '../../../assets/images/teacher.png'
import edit from '../../../assets/images/edit-2.png'
import trash from '../../../assets/images/trash.png'

export type PacksTableProps = {
    packId: string
    name: string
    cards: number
    updated: string
    created: string
    packUserId: string
}

export const PacksTable = (props: PacksTableProps) => {
    return (
        <tr>
            <td className={style.tableName}>{props.name}</td>
            <td className={style.tableCards}>{props.cards}</td>
            <td className={style.tableUpd}>{props.updated}</td>
            <td className={style.tablecreated}>{props.created}</td>
            <td className={style.tableAction}>
                <img src={teacher} style={{paddingRight:'5px'}}/>
                <img src={edit} style={{paddingRight:'5px'}}/>
                <img src={trash} style={{paddingRight:'5px'}}/>
            </td>
        </tr>
    )
}