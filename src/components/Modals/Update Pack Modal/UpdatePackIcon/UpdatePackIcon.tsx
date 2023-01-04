import React, { FC } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import {UpdateNewPackModal} from "../UpdateNewPackModal";
import useModal from "../../../../hooks/useModal";


export const EditPackIcon: FC<EditPackIconType> = ({ id_pack, namePack }) => {
    const { itemModalOpen, toggle } = useModal()

    return (
        <IconButton onClick={toggle}>
            <EditOutlinedIcon fontSize={'small'} />
            <UpdateNewPackModal open={itemModalOpen} hide={toggle} id_pack={id_pack} namePack={namePack} />
        </IconButton>
    )
}

type EditPackIconType = {
    id_pack: string
    namePack: string
}