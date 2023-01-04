import IconButton from "@mui/material/IconButton";
import {DeleteOutline} from "@mui/icons-material";
import {DeleteNewPackModal} from "../DeleteNewPackModal";
import * as React from "react";
import useModal from "../../../../hooks/useModal";


type DeleteModalButtonPropsType = {
    id_pack: string
    name: string
}


export const DeleteModalButton: React.FC<DeleteModalButtonPropsType> = ({name, id_pack}) => {

    const {itemModalOpen, toggle} = useModal()

    return (

        <div>
            <IconButton onClick={toggle}>
                <DeleteOutline fontSize={'small'}/>
                <DeleteNewPackModal open={itemModalOpen} hide={toggle}
                                    id_pack={id_pack} name={name}/>
            </IconButton>
        </div>
    )

}