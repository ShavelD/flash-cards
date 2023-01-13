// import React, { ChangeEvent } from 'react';
// import { IconButton } from '@mui/material';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import style from "../Profile.module.css";

//
// export const InputTypeFile = () => {
//
//     const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length) {
//             const file = e.target.files[0]
//             console.log('file: ', file)
//         }
//     };
//
//     return (
//         <label className={style.newUserPhoto}>
//             <input type="file"
//                    onChange={uploadHandler}
//                    style={{display: 'none'}}
//                    accept="image/*"
//                    multiple
//             />
//             <IconButton component="span">
//                 <AddAPhotoIcon/>
//             </IconButton>
//         </label>
//     )
// }
import React, { ChangeEvent } from 'react';
import { IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import style from "../Profile.module.css";
export const InputTypeFile = () => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
                const reader = new FileReader();

                reader.onloadend = () => {
                    const file64 = reader.result as string
                    console.log('file64: ', file64)
                }
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
                reader.readAsDataURL(file)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    return (
        <label className={style.newUserPhoto}>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept="image/*"
                   multiple
            />
            <IconButton component="span">
                <AddAPhotoIcon/>
            </IconButton>
        </label>
    )
}



//
//
// import React, { ChangeEvent, useRef } from 'react';
// import newUserPhoto from "../../../assets/images/newUserPhoto.svg";
// import style from "../Profile.module.css";
//
// export const InputTypeFile = () => {
//
//     const inputRef = useRef<HTMLInputElement>(null)
//
//     const selectFileHandler = () => {
//         inputRef && inputRef.current?.click();
//     };
//
//     const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length) {
//             const file = e.target.files[0]
//             console.log('file: ', file)
//         }
//     };
//
//     return (
//         <div>
//             <img onClick={selectFileHandler} className={style.newUserPhoto} src={newUserPhoto}/>
//             <input
//                 style={{display: 'none'}}
//                 ref={inputRef}
//                 type="file"
//                 onChange={uploadHandler}
//             />
//         </div>
//     )
// }

