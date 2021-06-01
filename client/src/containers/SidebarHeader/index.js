import React, { useState } from 'react'
import {
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core'
import { useStyles } from './style'
import { DropzoneDialog } from 'material-ui-dropzone'
import { MoreHoriz } from '@material-ui/icons'
import UserAvatar from '../../components/UserAvatar/index'
import { useUserDispatch, useUserStore } from '../../context/user/userContext'
import UserServices from 'services/apiCalls/user.services'

import { useHistory } from 'react-router-dom'
import Action, { ActionTypes } from 'types'

const SidebarHeader = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useUserStore()
  const classes = useStyles()
  const history = useHistory()
  const userDispatch = useUserDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSave = async (files) => {}

  const handleLogout = () => {
    UserServices.logout()
      .then(() => {
        userDispatch(Action(ActionTypes.RESET_USER))
        history.push('/')
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <UserAvatar imageUrl={user.pictureURL} />
        <Typography variant="body2" className={classes.typography}>
          {user.name}
        </Typography>
      </div>
      <div className={classes.leftRightSideStyle}>
        <Tooltip title="More actions" placement="bottom" arrow>
          <ButtonBase
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ marginLeft: 20 }}
          >
            <MoreHoriz />
          </ButtonBase>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setOpen(true)}>Replace picture</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          showPreviews={true}
          maxFileSize={2000000}
          onClose={() => {
            setOpen(false)
            handleClose()
          }}
        />
      </div>
    </div>
  )
}
export default SidebarHeader
