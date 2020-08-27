import React, { memo, useContext } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, Chip, ListItem } from "@material-ui/core";
import SelectConversation from "../../context/SelectConversation";

const ChatItem = (props) => {
  const classes = useStyles();
  const { name, messageCount, index, select, selected } = props;
  const context = useContext(SelectConversation);
  
  const onChatClick = (event) => {
    select(event, index)
    context.setConversation(name)
  }
  return (
    <ListItem button className={classes.root} onClick={onChatClick} selected={selected === index}>
      <div className={classes.avatarNameContainer} >
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
