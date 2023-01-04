import React, { FC } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import {DeleteNewPackModal} from "../DeleteNewPackModal";
import useModal from "../../../../hooks/useModal";

export const DeleteModalIcon: FC<DeleteModalIconType> = ({ id_pack, name }) => {
    const { itemModalOpen, toggle } = useModal()

    return (
        <IconButton onClick={toggle}>
            <DeleteOutlinedIcon fontSize={'small'} />
            <DeleteNewPackModal
                open={itemModalOpen}
                hide={toggle}
                id_pack={id_pack}
                name={name}
            />
        </IconButton>
    )
}

type DeleteModalIconType = {
    id_pack: string
    name: string
}
