import React, { ChangeEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import style from "../Profile.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/hook";
import { changeProfileTC} from "../../../redux/profile-reducer";
import {uploadHandler} from "../../../utils/uploadFile";
import defaultAva from "../../../assets/images/Avatar.jpg"

export const InputTypeFile = () => {

    const userAvatar = useAppSelector(state => state.profile.avatar)
    const dispatch = useAppDispatch()

    const [ava, setAva] = useState(userAvatar)


    const loadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        uploadHandler(event, setAva, file64 => {
            dispatch(changeProfileTC({avatar: file64}))
        })
    }

    return (
        <div>
            <img
                src={userAvatar === undefined ? defaultAva : ava}
                style={{width: '100px'}}
                alt="ava"
            />
            <label className={style.newUserPhoto}>
                <input type="file"
                       onChange={loadPhotoHandler}
                       style={{display: 'none'}}
                       accept="image/*"
                       multiple
                />
                <IconButton component="span">
                    <AddAPhotoIcon/>
                </IconButton>
            </label>
        </div>
    )
}
  

