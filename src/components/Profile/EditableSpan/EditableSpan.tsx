import React, {ChangeEvent, useEffect, useState} from 'react';

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
        <div>
            {editMode
                ?
                <div>
                    <input value={title} onChange={changeNameTitle} autoFocus onBlur={offEditMode}/>
                    <button onClick={onEditMode}>save</button>
                </div>
                : <span onDoubleClick={onEditMode}>{name || 'no name'}</span>
            }
        </div>
    );
};
