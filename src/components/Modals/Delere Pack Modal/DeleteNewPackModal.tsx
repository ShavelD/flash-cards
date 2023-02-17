import React, {useEffect, useState} from 'react'
import {BasicModal} from "../BasicModals";
import {deletePackTC} from "../../../redux/main-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
import style from './DeleteNewPackModall.module.css'
import {setIsInitializedTC} from "../../../redux/app-reducer";




type DeleteNewPackModalType = {
    open: boolean
    name: string
    hide: () => void
    id_pack: string
}


export const DeleteNewPackModal: React.FC<DeleteNewPackModalType> = ({open, hide, name, id_pack}) => {

    const dispatch = useAppDispatch()

    const deletePack = () => {
        dispatch(deletePackTC(id_pack))
    }


    return (
        <>
            <BasicModal open={open}>
                <div className={style.headerModal}>
                    <h2>Delete Pack</h2>
                    <button onClick={hide}>X</button>
                </div>
                <hr/>
                <div>Do you really want to remove <b>{name}</b>?
                    All cards will be deleted.
                </div>
                <div className={style.wrapperButtonModal}>
                    <button type={'submit'} className={style.buttonCancel} onClick={hide}>Cancel</button>
                    <button type={'submit'} className={style.buttonDelete} onClick={deletePack}>Delete</button>
                </div>
            </BasicModal>
        </>
    )
}