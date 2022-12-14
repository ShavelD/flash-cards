import React, { FC } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import useModal from "../../hooks/useModal";
import {CardsModal} from "../../components/Modals/Add Card/AddCardModal";



export const EditCardIcon: FC<EditCardIconType> = ({ id_pack, id_card, cardQuestion, cardAnswer }) => {
    const { itemModalOpen, toggle } = useModal()

    return (
        <IconButton onClick={toggle}>
            <EditOutlinedIcon fontSize={'small'} />
            <CardsModal
                titleName={'Edit card'}
                id_pack={id_pack}
                id_card={id_card}
                open={itemModalOpen}
                hide={toggle}
                cardQuestion={cardQuestion}
                cardAnswer={cardAnswer}
            />
        </IconButton>
    )
}

type EditCardIconType = {
    id_pack: string
    id_card: string
    cardQuestion: string
    cardAnswer: string
}