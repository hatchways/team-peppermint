import React, { memo, useState, useCallback } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, ListItem, ButtonBase } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { MoreHoriz } from "@material-ui/icons";
import uploadUserImage from "../../services/uploadUserImage";

const ContactItem = (props) => {
  const [open, setOpen] = useState(false);  
  const classes = useStyles();
  const { name, index } = props;

  const handleSave = (files) => {
    // add user email to make user avatar unique
    Object.defineProperties(files[0], {
      name: {
        value: "ya@ya.ru" + files[0].name,
        writable: true,
      },
    });    
    uploadUserImage(files[0])
    setOpen(false);
  };

  return (
    <ListItem button className={classes.root}>
      <div className={classes.avatarNameContainer}>
        <UserAvatar />
        <Typography
          variant="body1"
          style={{ marginBottom: 0, fontWeight: 600 }}
          gutterBottom
        >
          {name}
        </Typography>
      </div>
      <ButtonBase
        onClick={() => setOpen(true)}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <MoreHoriz />
      </ButtonBase>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => setOpen(false)}
      />
    </ListItem>
  );
};

export default memo(ContactItem);
