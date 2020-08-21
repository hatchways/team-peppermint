import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import InvitationDialog from "../InvitationDialog";
import { useStyles } from "./style";
import { List, Typography, ButtonBase } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";
import {
  useContactsDispatch,
  useContactsState,
  fetchContactsAndInvitations,
  deleteContact,
} from "../../context/contacts/contactsContext";
const jwtDecode = require("jwt-decode");

const ContactsList = () => {
  const [contactsList, setContactsList] = useState([]);
  const classes = useStyles();

  const [inviteDialog, showInviteDialog] = useState(false);
  const openInviteDialog = () => {
    showInviteDialog(true);
  };
  const closeInviteDialog = () => {
    showInviteDialog(false);
  };

  const dispatch = useContactsDispatch();
  const { contacts } = useContactsState();
  const userToken = localStorage.getItem("auth-token");
  const decodedToken = jwtDecode(userToken);
  useEffect(() => {
    decodedToken.id &&
      !contactsList.length &&
      fetchContactsAndInvitations(decodedToken.id, dispatch);
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);
  
  const handleDeleteContactButton = (email, index) => {
    deleteContact(decodedToken.id, email, index, dispatch);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  return (
    <>
      <ButtonBase
        onClick={() => openInviteDialog()}
        style={{ marginBottom: 10 }}
      >
        <div className={classes.inviteFriendsContainer}>
          <AddIcon color="primary" />
          <Typography
            variant="body2"
            color="primary"
            className={classes.typography}
            gutterBottom
          >
            Invite Friends
          </Typography>
        </div>
      </ButtonBase>
      <InvitationDialog open={inviteDialog} onClose={closeInviteDialog} />
      <List className={classes.root}>
        {!!contactsList.length ? (
          contactsList.map((contact, index) => (
            <ContactItem
              key={index}
              name={contact.name}
              email={contact.email}
              imageUrl={""}
              isOnline={true}
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
