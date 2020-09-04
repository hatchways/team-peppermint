import React from "react";
import { useStyles } from "./style";
import ChatItem from "../../components/ChatItem";
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List";
import {
  useConversationsState
} from "../../context/conversations/conversationsContext";
const ChatList = ({ usersData }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const { conversations } = useConversationsState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <List className={classes.root}>
      {conversations.length > 0 ?
        conversations.map((conversation, index) => {
          if ((conversation.messageCount > 0 || conversation.users.length > 2) && usersData)
            return (
              <ChatItem
                key={index}
                conversation={conversation}
                index={index}
                select={handleListItemClick}
                selected={selectedIndex}
                lastMessage={
                  conversation.lastMessage ?
                    conversation.lastMessage
                      .textVersions
                    : undefined}
                usersData={usersData}

              />
            )
            else return null
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
