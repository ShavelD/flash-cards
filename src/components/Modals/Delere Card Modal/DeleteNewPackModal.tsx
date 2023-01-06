import React from 'react'
import {BasicModal} from "../BasicModals";
import {useAppDispatch} from "../../../hooks/hook";
import style from './DeleteNewPackModall.module.css'
import {deleteCardTC} from "../../../redux/cards-reducer";



type DeleteNewPackModalType = {
    open: boolean
    name: string
    hide: () => void
    id_pack: string
    id_card: string
}


export const DeleteCardModal: React.FC<DeleteNewPackModalType> = ({open, hide, name, id_pack, id_card}) => {

    const dispatch = useAppDispatch()

    const deletePack = () => {
        dispatch(deleteCardTC(id_pack, id_card ? id_card : ''))
    }

    return (
        <>
            <BasicModal open={open}>
                <div className={style.headerModal}>
                    <h2>Delete Card</h2>
                    <button onClick={hide}>X</button>
                </div>
                <hr/>
                <div>Do you really want to remove <b>{name}</b>?
                    Card will be deleted.
                </div>
                <div className={style.wrapperButtonModal}>
                    <button type={'submit'} className={style.buttonCancel} onClick={hide}>Cancel</button>
                    <button type={'submit'} className={style.buttonDelete} onClick={deletePack}>Delete</button>
                </div>
            </BasicModal>
        </>
    )
}