import React, {FC} from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {IconButton} from '@mui/material'

import {DeleteCardModal} from "../DeleteNewPackModal";
import useModal from "../../../../hooks/useModal";


export const DeleteModalIcon: FC<DeleteModalIconType> = ({id_pack, id_card, name}) => {
    const {itemModalOpen, toggle} = useModal()

    return (
        <IconButton onClick={toggle}>
            <DeleteOutlinedIcon fontSize={'small'}/>
            <DeleteCardModal
                open={itemModalOpen}
                hide={toggle}
                id_pack={id_pack}
                id_card={id_card}
                name={name}
            />
        </IconButton>
    )
}

type DeleteModalIconType = {
    id_pack: string
    id_card: string
    name: string
}