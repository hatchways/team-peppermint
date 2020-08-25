import React from "react";
import { useStyles } from "./style";
import ChatItem from "../../components/ChatItem";
import List from "@material-ui/core/List";

const ChatList = () => {
  const classes = useStyles();

  // mock data
  const chatList = [
    {
      name: "Tomas",
      messageCount: 5,
    },
    {
      name: "Jane",
      messageCount: 2,
    },
    {
      name: "Adrian",
      messageCount: 17,
    },
    {
      name: "Santiago",
      messageCount: 9,
    },
    {
      name: "Jesus",
      messageCount: 11,
    },
    {
      name: "Tomas",
      messageCount: 5,
    },
    {
      name: "Jane",
      messageCount: 2,
    },
    {
      name: "Marat",
      messageCount: 15,
    },
    {
      name: "Jimmi",
      messageCount: 59,
    },
    {
      name: "Ron",
      messageCount: 26,
    },
  ];

  return (
    <List className={classes.root}>
      {chatList &&
        chatList.map((chat, index) => (
          <ChatItem
            key={index}
            name={chat.name}
            messageCount={chat.messageCount}
          />
        ))}
    </List>
  );
};

export default ChatList;
