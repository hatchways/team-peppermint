import React, { memo, useState } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import {
  Typography,
  ListItem,
  ButtonBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { MoreHoriz } from "@material-ui/icons";
import uploadUserImage from "../../services/uploadUserImage";

const ContactItem = ({ imageUrl, name, index, isOnline }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const handleSave = (files) => {
    uploadUserImage(files[0]);
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem button className={classes.root}>
      <div className={classes.avatarNameContainer}>
        <UserAvatar imageUrl={imageUrl} isOnline={isOnline} />
        <Typography
          variant="body1"
          className={classes.contactName}
          gutterBottom
        >
          {name}
        </Typography>
      </div>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.buttonBase}
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
        <MenuItem onClick={() => console.log("Contact deleted")}>
          Delete contact
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
    </ListItem>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl:PropTypes.string,
  index:PropTypes.number.isRequired,
  isOnline:PropTypes.bool.isRequired,
};
