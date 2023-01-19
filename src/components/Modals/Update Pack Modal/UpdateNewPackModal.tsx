import React, {useState} from 'react'
import {BasicModal} from "../BasicModals";
import {updatePackTC} from "../../../redux/main-reducer";
import {useAppDispatch} from "../../../hooks/hook";
import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import style from '../Add New Pack Modal/AddNewPackModal.module.css'
import {ImageInput} from "../ImageInput/ImageInput";


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
            isPrivate: false,
            deckCover: ''
        },
        validate,
        onSubmit: (values: { namePack: string; isPrivate: boolean, deckCover: string }) => {
            dispatch(updatePackTC(values.namePack, id_pack ? id_pack : '', values.deckCover))
            hide()
        },
    })

    const { values} = { ...formik };
    const [val, setVal] = useState(values);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const changeValue = (value: string): void => {
        values.deckCover = value;
        setVal({ ...val, deckCover: value });
        setIsDirty(true);
    };

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