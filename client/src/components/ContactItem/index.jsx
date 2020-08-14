import React, { memo, useState } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, ListItem, ButtonBase } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import uploadUserImage from "../../services/uploadUserImage";

const ContactItem = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { name, index } = props;

  const handleSave = (files) => {
    uploadUserImage(files[0]);
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
      />
    </ListItem>
  );
};

export default memo(ContactItem);
