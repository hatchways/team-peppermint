import React, { useContext, useEffect, useState } from "react";
import { Typography, ButtonBase, Menu, MenuItem } from "@material-ui/core";
import { useStyles } from "./style";
import { DropzoneDialog } from "material-ui-dropzone";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";
import uploadUserImage from "../../services/uploadUserImage";

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

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <UserAvatar />
        <Typography variant="body2" className={classes.typography}>
          Santiago
        </Typography>
      </div>
      <div className={classes.leftRightSideStyle}>
        <ButtonBase
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ marginLeft: 20 }}
        >
          <MoreHoriz />
        </ButtonBase>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setOpen(true)}>Add picture</MenuItem>
          <MenuItem onClick={() => console.log("Logged out")}>Log out</MenuItem>
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
