import React, {useState} from 'react'
import {BasicModal} from "../BasicModals";
import {addPackTC} from "../../../redux/main-reducer";
import {useAppDispatch} from "../../../hooks/hook";
import style from './AddNewPackModal.module.css'
import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import {ReturnComponentType} from "../../../common/Types/ReturnComponentType";
import {ImageInput} from "../ImageInput/ImageInput";


type AddNewPackModalType = {
    open: boolean
    hide: () => void
}

type errorsType = {
    namePack?: string,
    isPrivate?: boolean,
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


export const AddNewPackModal: React.FC<AddNewPackModalType> = ({open, hide}): ReturnComponentType => {

    const formik = useFormik({
        initialValues: {
            namePack: '',
            isPrivate: false,
            deckCover: '',
        },
        validate,
        onSubmit: (values: { namePack: string; isPrivate: boolean, deckCover: string }) => {
            dispatch(addPackTC({
                cardsPack: {
                    name: values.namePack, private: values.isPrivate,
                    deckCover: values.deckCover
                }
            }))
            hide()
        },
    })

    const {values} = {...formik};
    const [val, setVal] = useState(values);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const changeValue = (value: string): void => {
        values.deckCover = value;
        setVal({...val, deckCover: value});
        setIsDirty(true);
    };

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
                        <ImageInput
                            name="deckCover"
                            title="Download cover"
                            value={values.deckCover}
                            changeValue={changeValue}
                        />
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