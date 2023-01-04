import React from 'react'
import {BasicModal} from "../BasicModals";
import {updatePackTC} from "../../../redux/main-reducer";
import {useAppDispatch} from "../../../hooks/hook";
import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import style from '../Add New Pack Modal/AddNewPackModal.module.css'


type UpdateNewPackModal = {
    open: boolean
    hide: () => void
    id_pack: string
    namePack: string

}

type errorsType = {
    namePack?: string,
    isPrivate?: boolean
}

const validate = (values: { namePack: string; isPrivate: boolean }) => {
    const errors: errorsType = {};
    if (!values.namePack) {
        errors.namePack = 'введите имя!';
    } else if (values.namePack.length > 20) {
        errors.namePack = 'некорректное имя';
    }
    return errors;
};


export const UpdateNewPackModal: React.FC<UpdateNewPackModal> = ({open, hide, id_pack, namePack}) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            namePack:  namePack,
            isPrivate: false
        },
        validate,
        onSubmit: (values: { namePack: string; isPrivate: boolean }) => {
            dispatch(updatePackTC(values.namePack, id_pack ? id_pack : ''))
            hide()
        },
    })

    return (
        <>
            <BasicModal open={open}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <div className={style.headerModal}>
                        <h2>Edit pack</h2>
                        <button onClick={hide}>X</button>

                    </div>
                    <hr/>
                    <div className={style.wrapperInput}>
                        <Box>
                            <TextField sx={{width: '37.4ch'}}
                                       id="input-with-sx" label="Name Pack" variant="standard"
                                       {...formik.getFieldProps('namePack')}/>
                            {formik.touched.namePack && formik.errors.namePack ?
                                <div style={{color: 'red'}}>{formik.errors.namePack}</div> : null}
                        </Box>
                    </div>
                    <div className={style.wrapperRememberMe}>
                        <input
                            type={'checkbox'}
                            checked={formik.values.isPrivate}
                            {...formik.getFieldProps('isPrivate')}
                        />
                        <div className={style.private}>Private pack</div>
                    </div>
                    <div className={style.wrapperButtonModal}>
                        <button type="submit" className={style.buttonCancel} onClick={hide}>Cancel</button>
                        <button type="submit" className={style.buttonSave}>Save</button>
                    </div>
                </form>
            </BasicModal>
        </>
    )
}