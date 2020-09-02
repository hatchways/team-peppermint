import React, { useState, useEffect, useCallback } from "react";
import { useStyles } from "./style";
import ChatItem from "../../components/ChatItem";
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List";
import Axios from "axios";
import { useUserState } from "../../context/user/userContext";

const ChatList = () => {
  const classes = useStyles();
  const [chatList, setChatList] = useState([]);
  const { user } = useUserState();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    if (user.email !== undefined)
      Axios.get(`/user/${user.email}/groupchats`)
        .then((chats) => setChatList(chats.data))
        .catch((err) => {
          console.log(err)
          setChatList([]);
        })
  }, [user])
  return (
    <List className={classes.root}>
      {chatList.length > 0 ?
        chatList.map((chat, index) => (
          <ChatItem
            key={index}
            name={chat}
            messageCount={10}
            index={index}
            select={handleListItemClick}
            selected={selectedIndex}
          />
        )) :
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
