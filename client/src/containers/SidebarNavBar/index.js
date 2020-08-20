import React, { useContext, useEffect, useState } from "react";
import { Typography, ButtonBase, Menu, MenuItem,Tooltip } from "@material-ui/core";
import { useStyles } from "./style";
import { DropzoneDialog } from "material-ui-dropzone";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";
import uploadUserImage from "../../services/uploadUserImage";
import { NavLink } from "react-router-dom";

const isOnline = localStorage.getItem("auth-token");

const SidebarNavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (files) => {
    uploadUserImage(files[0]);
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <UserAvatar isOnline={!!isOnline} />
        <Typography variant="body2" className={classes.typography}>
          Santiago
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
          <MenuItem onClick={() => setOpen(true)}>Add picture</MenuItem>
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
          maxFileSize={300000}
          onClose={() => {
            setOpen(false);
            handleClose();
          }}
        />
      </div>
    </div>);
};
export default SidebarNavBar;
