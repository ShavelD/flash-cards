import React from 'react'
import useModal from "../../../hooks/useModal";
import {useParams} from "react-router-dom";
import {CardsModal} from "./AddCardModal";
import style from './AddCard.module.css'


export const AddCardModal = () => {
    const { itemModalOpen, toggle } = useModal()
    const { id_pack } = useParams()

    return (
        <>
        <button onClick={toggle} className={style.addCardModalButton}>
            Add new card
        </button>
        <CardsModal titleName={'Add new card'} id_pack={id_pack ? id_pack : ''}
                    open={itemModalOpen} hide={toggle}/>
        </>
    )
}