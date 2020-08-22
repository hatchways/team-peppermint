import React, { memo } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, Chip, ListItem } from "@material-ui/core";

const ChatItem = ({ name, messageCount }) => {
  const classes = useStyles();

  return (
    <ListItem button className={classes.root}>
      <div className={classes.avatarNameContainer}>
        <UserAvatar />
        <div className={classes.nameContainer}>
          <Typography
            variant="body1"
            style={{ marginBottom: 0, fontWeight: 600 }}
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginBottom: 0, fontWeight: 600, fontSize: "0.8rem" }}
            gutterBottom
          >
            Sure, what time?
          </Typography>
        </div>
      </div>

      <Chip
        label={messageCount}
        color="primary"
        size="small"
        className={classes.chip}
      />
    </ListItem>
  );
};

export default memo(ChatItem);

ChatItem.propTypes = {
  name: PropTypes.string,
  messageCount: PropTypes.number,
};
