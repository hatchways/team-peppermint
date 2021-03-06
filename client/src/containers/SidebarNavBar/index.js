import React, { useEffect, useState } from "react";
import {
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { useStyles } from "./style";
import { DropzoneDialog } from "material-ui-dropzone";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";
import { uploadUserImage } from "../../services/uploadDeleteUserImage";
import { NavLink } from "react-router-dom";
import {
  useUserState,
  useUserDispatch,
  fetchUserData,
} from "../../context/user/userContext";
import {
  resetContactsInvitationsLists,
  useContactsDispatch,
} from "../../context/contacts/contactsContext";
import {
  useConversationsDispatch,
  resetConversations
} from "../../context/conversations/conversationsContext";
import socket from "../../socket-client/socket";

const SidebarNavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const classes = useStyles();

  const { user } = useUserState();
  const dispatch = useUserDispatch();
  const contactsDispatch = useContactsDispatch();
  const conversationsDispatch = useConversationsDispatch();
  const isOnline = localStorage.getItem("auth-token");

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = async (files) => {
    setOpen(false);
    setAnchorEl(null);
    await uploadUserImage(files[0], userData.pictureURL, userData.email);
    fetchUserData(dispatch);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAnchorEl(null);
    resetContactsInvitationsLists(contactsDispatch);
    resetConversations(conversationsDispatch);
    socket.emit("logout", userData.email);
    socket.off();
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <UserAvatar isOnline={!!isOnline} imageUrl={userData.pictureURL} />
        <Typography variant="body2" className={classes.typography}>
          {userData.name}
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
          <MenuItem onClick={handleLogout}>
            <NavLink to="/login" className={classes.logoutStyle}>
              Log out
            </NavLink>
          </MenuItem>
        </Menu>
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          showPreviews={true}
          maxFileSize={2000000}
          onClose={() => {
            setOpen(false);
            handleClose();
          }}
        />
      </div>
    </div>
  );
};
export default SidebarNavBar;
