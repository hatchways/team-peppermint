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
import { uploadFile } from "react-s3";
import uploadUserImage from "../../services/uploadUserImage";

const ContactItem = (props) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();
  const { name, index } = props;

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: "photos" /* optional */,
    region: "us-west-2",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
  };

  const handleSave = async (files) => {
    // add user email to make user avatar unique
    Object.defineProperties(files[0], {
      name: {
        value: "ya@ya.ru" + files[0].name,
        writable: true,
      },
    });

    console.log("new file ", files[0]);
    uploadFile(files[0], config)
      .then((data) => {
        console.log("URL FROM AWS ", data);
        const imageUrl =
          "https://peppermint-12345-resized.s3.amazonaws.com/" + data.key;
        console.log("SPLIT DATA ", imageUrl);
        setImageUrl(data.location);
      })
      .catch((err) => setError(err.message));

    // uploadUserImage(files[0]);
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
        <UserAvatar imageUrl={imageUrl} />
        <Typography
          variant="body1"
          style={{ marginBottom: 0, fontWeight: 600 }}
          gutterBottom
        >
          {name}
        </Typography>
      </div>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          marginLeft: 20,
          marginRight: 20,
          padding: 10,
          borderRadius: "50%",
        }}
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
