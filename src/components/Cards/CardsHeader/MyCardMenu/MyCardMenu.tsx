import React, { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ListItemIcon, ListItemText, Paper, MenuItem, Menu } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import {EditPackIcon} from "../../../Modals/Update Pack Modal/UpdatePackIcon/UpdatePackIcon";
import {useAppSelector} from "../../../../hooks/hook";
import {useNavigate, useParams} from "react-router-dom";
import {DeleteModalIcon} from "../../../Modals/Delere Pack Modal/DeleteModalIcon/DeleteModalIcon";
import {SchoolOutlined} from "@mui/icons-material";
import s from './MyCardMenu.module.css'

export const MyCardMenu = () => {

    const namePacs = useAppSelector(state => state.cars.packName)

    const {id_pack} = useParams()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLearnClick = () => {
        if (id_pack) navigate(`/question/${id_pack}`)
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Paper sx={{ width: 320, maxWidth: '100%', pl: '560px' }}>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem disableRipple>
                        <ListItemIcon>
                            <EditPackIcon id_pack={id_pack ? id_pack : ''} namePack={namePacs}/>
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem disableRipple>
                        <ListItemIcon>
                            <DeleteModalIcon id_pack={id_pack ? id_pack : ''} name={namePacs}/>
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem className={s.schoolOutlined}  disableRipple>
                        <ListItemIcon>
                            <SchoolOutlined onClick={handleLearnClick} fontSize={"small"} className={s.schoolOutlined}/>
                        </ListItemIcon>
                        <ListItemText>Learn</ListItemText>
                    </MenuItem>
                </Menu>
            </Paper>
        </div>
    )
}