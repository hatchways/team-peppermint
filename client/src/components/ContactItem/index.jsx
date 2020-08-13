import React, { memo } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, ListItem } from "@material-ui/core";

const ContactItem = (props) => {
  const classes = useStyles();
  const { name, index } = props;

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
    </ListItem>
  );
};

export default memo(ContactItem);
