import React, { memo, useContext, useState, useEffect } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { Typography, ListItem } from "@material-ui/core";
import SelectConversation from "../../context/SelectConversation";
import { useUserState } from "../../context/user/userContext";
import {
  useContactsState,
  useContactsDispatch,
  fetchContactsAndInvitations,
  addUknownUser,
} from "../../context/contacts/contactsContext";
import ToggleLanguage from "../../context/ToggleLanguage";
const ChatItem = (props) => {
  const classes = useStyles();
  const { user } = useUserState();
  // const user = {};
  const dispatch = useContactsDispatch();
  const { contacts, unknownUsers } = useContactsState();
  // const contacts = [];
  // const unknownUsers = [];
  const {
    conversation,
    index,
    select,
    selected,
    lastMessage,
    usersData,
  } = props;
  const users = conversation.users.filter((cUser) => cUser !== user.email);
  const ToggleLanguageContext = useContext(ToggleLanguage);
  const context = useContext(SelectConversation);
  const [chatTitle, setChatTitle] = useState();
  const [message, setMessage] = useState("");

  const onChatClick = (event) => {
    select(event, index);
    context.setConversation(conversation.conversationID);
  };
  useEffect(() => {
    if (lastMessage)
      setMessage(
        lastMessage[
          ToggleLanguageContext.original
            ? Object.keys(lastMessage)[0]
            : user.language
        ]
      );
  }, [ToggleLanguageContext, lastMessage, user.language]);
  useEffect(() => {
    let fetch = false;
    if (Object.keys(contacts).length) {
      users.forEach((cUser) => {
        if (!contacts[cUser] && cUser !== user.email && !unknownUsers[cUser]) {
          addUknownUser(cUser, unknownUsers, dispatch);
          fetch = true;
        }
      });
    }
    if (fetch) {
      fetchContactsAndInvitations(user.email, dispatch);
    }
  }, [
    conversation,
    users,
    dispatch,
    contacts,
    unknownUsers,
    user.email,    
  ]);
  useEffect(() => {
    Object.keys(usersData).length &&
      setChatTitle(
        users
          .reduce((arr, cUser) => {
            if (usersData[cUser]) arr.push(usersData[cUser].name);
            return arr;
          }, [])
          .join()
      );
  }, [usersData, users]);
  return (
    <ListItem
      button
      className={classes.root}
      onClick={onChatClick}
      selected={selected === index}
    >
      <div className={classes.avatarNameContainer}>
        {users.length === 1 && (
          <UserAvatar
            imageUrl={
              usersData[users[0]] !== undefined &&
              usersData[users[0]].pictureUrl
            }
            isOnline={
              usersData[users[0]] !== undefined && usersData[users[0]].isOnline
            }
          />
        )}
        <div className={classes.nameContainer}>
          <Typography
            variant="body1"
            style={{ marginBottom: 0, fontWeight: 600 }}
            gutterBottom
          >
            {chatTitle}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginBottom: 0, fontWeight: 600, fontSize: "0.8rem" }}
            gutterBottom
          >
            {message}
          </Typography>
        </div>
      </div>

      {/* <Chip
        label={messageCount}
        color="primary"
        size="small"
        className={classes.chip}
      /> */}
    </ListItem>
  );
};

export default memo(ChatItem);

ChatItem.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  messageCount: PropTypes.number,
  select: PropTypes.func,
  index: PropTypes.number,
  selected: PropTypes.number,
};
