import React, {ChangeEvent, useState} from 'react';

import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';

import style from './ImageInput.module.css';
import {ReturnComponentType} from "../../../common/Types/ReturnComponentType";
import {convertFileToBase64} from "../../../utils/uploadFile";

type ImageInputPropsType = {
    value: string;
    changeValue: (value: string) => void;
    title: string;
    name: string;
};

export const ImageInput: React.FC<ImageInputPropsType> = ({
                                                              value,
                                                              changeValue,
                                                              title,
                                                              name,
                                                              /* handleChange, */
                                                          }): ReturnComponentType => {
    const [errorSize, setErrorSize] = useState<null | string>(null);

    const maxSize = 4000000;

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            if (file.size < maxSize) {
                convertFileToBase64(file, (file64: string) => {
                    setErrorSize(null);
                    changeValue(file64);
                });
            } else {
                setErrorSize('File size is too large');
            }
        }
    };

    return (
        <FormControl
            className={style.cover}
            fullWidth
            variant="standard"
        >
            <label htmlFor={name}>
                <Button component="span" fullWidth>
                    {title}
                </Button>
            </label>
            <input
                id={name}
                name={name}
                type="file"
                onChange={uploadHandler}
                style={{display: 'none'}}
            />
            {value && !errorSize ? <img className={style.image} src={value} alt=""/> :
                <div className={style.questionImg}></div>}
            {errorSize ? <span className={style.error}>{errorSize}</span> : null}
        </FormControl>
    );
};