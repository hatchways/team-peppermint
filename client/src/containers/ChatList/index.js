import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import ChatItem from "../../components/ChatItem";
import List from '@material-ui/core/List';
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
  const loadChats = () => {
    if(user)
    Axios.get(`user/${user.email}/groupchats`)
      .then((chats) => setChatList(chats.data))
      .catch((err) => console.error(err))
  }
  useEffect(()=>{
    loadChats();
  },[user])
  return (
    <List className={classes.root}>
      {chatList &&
        chatList.map((chat, index) => (
          <ChatItem
            key={index}
            name={chat}
            messageCount={10}
            index={index}
            select={handleListItemClick}
            selected={selectedIndex}
          />
        ))}
    </List>
  );
};

export default ChatList;
