import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./EditableSpan.module.css"
import {BorderColorOutlined} from "@mui/icons-material";

type EditableSpanPropsType = {
    name: string
    updateUserName: (name: any) => void
}

export const EditableSpan = ({name, updateUserName}: EditableSpanPropsType) => {

    let [title, setTitle] = useState<string>(name);
    let [editMode, setEditMode] = useState(true)

    const onEditMode = () => setEditMode(true)

    console.log(name)


    useEffect(() => {
        setTitle(name)
    }, [name])

    const offEditMode = () => {
        updateUserName(title)
        setEditMode(false)
    }

    const changeNameTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div className={style.wrapper}>
            {editMode
                ?
                <div>
                    <div className={style.nickname}>Nickname</div>
                    <input className={style.input} value={title} onChange={changeNameTitle} autoFocus onBlur={offEditMode}/>
                    <button className={style.button} onClick={onEditMode}>save</button>
                </div>
                : <div><span className={style.span} onDoubleClick={onEditMode}>{name || 'no name'}
                    <span className={style.borderColor}><BorderColorOutlined/></span>
                </span></div>
            }
        </div>
    );
};
