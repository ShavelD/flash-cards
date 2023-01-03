import React from 'react'
import style from '../PacksTable.module.css'

export type PacksBodyProps = {
    packId: string
    name: string
    cards: number
    updated: string
    created: string
    packUserId: string
}

export const PacksBody = (props: PacksBodyProps) => {
    return (
        <tr>
            <td className={style.tableName}>{props.name}</td>
            <td className={style.tableCards}>{props.cards}</td>
            <td className={style.tableUpd}>{props.updated}</td>
            <td className={style.tablecreated}>{props.created}</td>
            <td className={style.tableAction}>Actions</td>
        </tr>
    )
}
