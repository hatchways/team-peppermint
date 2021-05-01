import React from "react";
import { useStyles } from "./style";
import ChatItem from "../../components/ChatItem";
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List";
import { useConversationsStore } from "context/conversations/conversationsContext";

const ChatList = () => {
  const classes = useStyles();
  const { conversations } = useConversationsStore()

  return (
    <List className={classes.root}>
      {conversations.length > 0 ?
        conversations.map((conversation, index) => {
          return (
            <ChatItem
              key={index}
              conversation={conversation}
              index={index}

            />
          )
        }) :
        <Typography
          variant="body1"
          color="primary"
          gutterBottom
          style={{ color: "black", textAlign: "center" }}
        >
          No group chats
      </Typography>}
    </List>
  );
};

export default ChatList;
