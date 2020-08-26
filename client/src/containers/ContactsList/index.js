import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import InvitationDialog from "../InvitationDialog";
import { useStyles } from "./style";
import { List, Typography, Button } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";
import {
  useContactsDispatch,
  useContactsState,
  fetchContacts,
  deleteContact,
} from "../../context/contacts/contactsContext";
import CreateGroupChat from "../../components/CreateGroupChat";

const jwt_decode = require("jwt-decode");

const ContactsList = () => {
  const [contactsList, setContactsList] = useState([]);
  const classes = useStyles();

  const [inviteDiaolog, showInviteDialog] = useState(false);
  const openInviteDialog = () => {
    showInviteDialog(true);
  };
  const closeInviteDialog = () => {
    showInviteDialog(false);
  };

  const dispatch = useContactsDispatch();
  const { contacts } = useContactsState();
  const userToken = localStorage.getItem("auth-token");
  const decodedToken = jwt_decode(userToken);

  useEffect(() => {
    decodedToken && fetchContacts(decodedToken.id, dispatch);
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

  const handleDeleteContactButton = (email, index) => {
    deleteContact(email, index, dispatch);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [openGroupChatForm, setOpenGroupChatForm] = useState(false);
  const openChatForm = () => {
    setOpenGroupChatForm(true);
  };
  const closeChatForm = () => {
    setOpenGroupChatForm(false);
  };


  return (
    <>
      <div className={classes.inviteFriendsContainer}>
 
          <Typography
            variant="body2"
            color="primary"
            className={classes.typography}
            gutterBottom
          >
            <Button onClick={() => openInviteDialog()}><AddIcon color="primary" /> Invite Friends</Button>
            <InvitationDialog open={inviteDiaolog} onClose={closeInviteDialog} />
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className={classes.typography}
            gutterBottom
          > 
          <Button onClick={()=>openChatForm()}>
          <AddIcon color="primary" /> Create Group Chat</Button>
          <CreateGroupChat open={openGroupChatForm} onClose={closeChatForm} contactsList={contactsList} />
        </Typography>
      </div>
      <List className={classes.root}>
        {!!contactsList.length ? (
          contactsList.map((contact, index) => (
            <ContactItem
              key={index}
              name={contact.email}
              imageUrl={contact.imageUrl}
              isOnline={contact.isOnline}
              index={index}
              handleDeleteContactButton={handleDeleteContactButton}
              contact={contact}
              select={handleListItemClick}
              selected={selectedIndex}
            />
          ))
        ) : (
            <Typography
              variant="body1"
              color="primary"
              gutterBottom
              style={{ color: "black", textAlign: "center" }}
            >
              No contacts
            </Typography>
          )}
      </List>
    </>
  );
};

export default ContactsList;
