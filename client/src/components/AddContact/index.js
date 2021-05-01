import { Collapse, IconButton, InputBase, Typography, ButtonBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import React, { useState } from 'react'
import { useStyles } from './style'
const AddContact = () => {
    const classes = useStyles()
    const [openSeacrhBar, setOpenSearchBar] = useState(false)
    const handleAddContactButton = () => {
        setOpenSearchBar(!openSeacrhBar)
    }
    return (
        <>
            <div className={classes.root}>
                <ButtonBase onClick={handleAddContactButton}>
                    <AddIcon />
                    <Typography> Add Contact</Typography>
                </ButtonBase>
                <ButtonBase>
                    <GroupAddIcon />
                    <Typography>Create Group Chat</Typography>
                </ButtonBase>

            </div>
            <Collapse in={openSeacrhBar}>
                <div className={classes.searchBar}>
                    <InputBase placeholder='Search Contact' />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </div>
            </Collapse>
        </>
    )
}
export default AddContact