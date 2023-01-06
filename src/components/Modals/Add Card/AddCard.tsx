import React from 'react'
import useModal from "../../../hooks/useModal";
import {useParams} from "react-router-dom";
import {CardsModal} from "./AddCardModal";


export const AddCardModal = () => {
    const { itemModalOpen, toggle } = useModal()
    const { id_pack } = useParams()

    return (
        <>
        <button onClick={toggle}>
            Add new card
        </button>
        <CardsModal id_pack={id_pack ? id_pack : ''} hide={toggle} open={itemModalOpen}/>
        </>
    )
}