import React from 'react'
import {BasicModal} from "../BasicModals";
import {addPackTC} from "../../../redux/main-reducer";
import {useAppDispatch} from "../../../hooks/hook";
import style from './AddNewPackModal.module.css'
import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";


type AddNewPackModalType = {
    open: boolean
    hide: () => void
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


export const AddNewPackModal: React.FC<AddNewPackModalType> = ({open, hide}) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            namePack: '',
            isPrivate: false
        },
        validate,
        onSubmit: (values: { namePack: string; isPrivate: boolean }) => {
            dispatch(addPackTC({cardsPack: {name: values.namePack, private: values.isPrivate}}))
            hide()
        },
    })

    return (
        <>
            <BasicModal open={open}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <div className={style.headerModal}>
                        <h2>Add new pack</h2>
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