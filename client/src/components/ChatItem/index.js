import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import UserAvatar from "../UserAvatar";
import { Typography, ListItem } from "@material-ui/core";
import { useUserStore } from "../../context/user/userContext";
import { useLanguageContext, getMessageTextVersion } from "context/language/languageContext";
import { useCurrentConversationDispatch, useCurrentConversationStore } from "context/currentConversation/currentConversationContext";
import Action, { ActionTypes } from "types";


const ChatItem = ({ conversation }) => {
  const classes = useStyles()
  const { user, socket } = useUserStore()
  const { _id, users, conversationTitle, lastMessage } = conversation
  const { isOriginalLanguage } = useLanguageContext()
  const [lastMessageObject, setLastMessageObject] = useState(lastMessage)
  const currentConversation = useCurrentConversationStore()
  const currentConversationDispatch = useCurrentConversationDispatch()
  const isGroupConversation = users.length > 2
  const otherUsers = users.filter(u => u._id !== user._id)
  const chatItemTitle = isGroupConversation ? conversationTitle || 'Group Chat' : otherUsers[0].name


  const onChatClick = () => {
    currentConversationDispatch(Action(ActionTypes.SET_CURRENT_CONVERSATION, conversation));
  };
  useEffect(() => {
    socket.on(`${conversation._id}-message`, messageData => {
      setLastMessageObject(messageData)
      if (currentConversation._id === _id)
        currentConversationDispatch(Action(ActionTypes.PUSH_MESSAGE, messageData))
    })
    return () => socket.off(`${conversation._id}-message`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ListItem
      button
      className={classes.root}
      onClick={onChatClick}
      selected={currentConversation?._id === _id}
    >
      <div className={classes.avatarNameContainer}>
        {otherUsers.length === 1 && (
          <UserAvatar
            imageUrl={otherUsers[0].profileImg}
          />
        )}
        <div className={classes.nameContainer}>
          <Typography
            variant="h5"
            gutterBottom
          >
            {chatItemTitle}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
          >
            {getMessageTextVersion(lastMessageObject, isOriginalLanguage, user.language)}
          </Typography>
        </div>
      </div>
    </ListItem>
  );
};

export default ChatItem

