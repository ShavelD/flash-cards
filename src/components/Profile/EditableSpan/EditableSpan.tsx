import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./EditableSpan.module.css"
import {BorderColorOutlined} from "@mui/icons-material";

type EditableSpanPropsType = {
    name: string
    updateUserName: (name: string) => void
}

export const EditableSpan = ({name, updateUserName}: EditableSpanPropsType) => {

    let [title, setTitle] = useState<string>(name);
    let [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(!editMode)

    useEffect(() => {
        setTitle(name)
    }, [name])

    const offEditMode = () => {
        setTitle(title)
        setEditMode(!editMode)
        updateUserName(title)
    }

    const changeNameTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div className={style.wrapper}>
            {editMode
                ?
                <div>
                    <div className={style.nickname}>Nickname</div>
                    <input className={style.input} value={title} onChange={changeNameTitle} autoFocus onBlur={offEditMode}/>
                    <button className={style.button}>save</button>
                </div>
                : <div><span className={style.span} onDoubleClick={onEditMode}>{name || 'no name'}
                    <span className={style.borderColor}><BorderColorOutlined/></span>
                </span></div>
            }
        </div>
    );
};
