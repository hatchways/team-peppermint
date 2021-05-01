import React, { useEffect } from "react";
import { useStyles } from "./style";
import UserAvatar from "../UserAvatar";
import stringHash from 'string-hash'
import {
  Typography,
  ListItem,
  ButtonBase,
  IconButton,
} from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { useUserStore } from "context/user/userContext";
import { useConversationsDispatch, useConversationsStore } from "context/conversations/conversationsContext";
import { useCurrentConversationDispatch, useCurrentConversationStore } from "context/currentConversation/currentConversationContext";
import Action, { ActionTypes } from "types";
import UserServices from "services/apiCalls/user.services";
import { useContactsDispatch } from "context/contacts/contactsContext";
const ContactItem = ({ contact, unknown, removeFromUknown }) => {
  const classes = useStyles()
  const { conversations } = useConversationsStore()
  const { user, socket } = useUserStore()
  const { name, isOnline } = contact
  const contactsDispatch = useContactsDispatch()
  const conversationsDispatch = useConversationsDispatch()
  const currentConversation = useCurrentConversationStore()
  const currentConversationDispatch = useCurrentConversationDispatch()
  const conversationID = stringHash([user._id, contact._id].sort().join())

  const handleContactItemClick = () => {
    const conversationPayload = conversations.find(conversation =>
      conversation.conversationID === conversationID &&
      conversation.conversationTitle === null)
    currentConversationDispatch(Action(ActionTypes.SET_CURRENT_CONVERSATION, conversationPayload))
  }
  const handleAddIconClick = () => {
    UserServices.addContact(contact._id)
      .then(response => {
        contactsDispatch(Action(ActionTypes.ADD_CONTACT, response.data.newContact))
        if (response.data.newConversation)
          conversationsDispatch(Action(ActionTypes.ADD_CONVERSATION, response.data.newConversation))
        removeFromUknown(contact)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const updateContactStatus = (status) => {
      contactsDispatch(Action(ActionTypes.UPDATE_CONTACT_STATUS, { contact, status }))
    }
    socket.on(`${contact._id}-login`, ({ isOnline }) => { if (!unknown) updateContactStatus(isOnline) })
    socket.on(`${contact._id}-logout`, ({ isOnline }) => { if (!unknown) updateContactStatus(isOnline) })
    return () => {
      socket.off(`${contact._id}-login`)
      socket.off(`${contact._id}-logout `)
    }
  }, [socket, unknown, contact, contactsDispatch])
  return (
    <ListItem
      className={classes.root}
      selected={currentConversation.conversationID === conversationID && currentConversation.conversationTitle === null}
    >
      <ButtonBase className={classes.contactButton} disabled={unknown} onClick={handleContactItemClick}>
        <UserAvatar isOnline={isOnline} />
        <Typography variant='h6'>{name}</Typography>
      </ButtonBase>
      {unknown &&
        <IconButton onClick={handleAddIconClick}>
          <AddCircleRoundedIcon color='primary' />
        </IconButton>
      }
    </ListItem>
  );
};

export default ContactItem

