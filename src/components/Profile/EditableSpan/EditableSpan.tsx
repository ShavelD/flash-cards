import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    name: string
    onChange: (any: any) => void
}

export const EditableSpan = ({name, onChange}: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState(name);
    console.log(name)

    const activateEditMode = () => {
            setEditMode(true);
            setTitle(name);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <div>
            { editMode
                ?
                <div>
                    <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
                    <button onClick={activateEditMode}>save</button>
                </div>
                :
                <span onDoubleClick={activateEditMode}>{name}</span>}
        </div>
    );
};

