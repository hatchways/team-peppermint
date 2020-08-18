import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import { List, Typography } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";
import {
  useContactsDispatch,
  useContactsState,
  fetchContacts,
  deleteContact,
} from "../../context/contacts/contactsContext";

const ContactsList = () => {
  const [contactsList, setContactsList] = useState([]);
  const classes = useStyles();

  const dispatch = useContactsDispatch();
  const { contacts } = useContactsState();

  useEffect(() => {
    fetchContacts("ya@ya.ru", dispatch);
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

  const handleDeleteContactButton = (email, index) => {
    deleteContact(email, index, dispatch);
  };

  return (
    <>
      <div className={classes.inviteFriendsContainer}>
        <AddIcon color="primary" />
        <Typography
          variant="body2"
          color="primary"
          className={classes.typography}
          gutterBottom
        >
          Invite friends
        </Typography>
      </div>
      <List className={classes.root}>
        {!!contactsList.length ? (
          contactsList.map((contact, index) => (
            <ContactItem
              key={index}
              name={contact.name}
              imageUrl={contact.imageUrl}
              isOnline={contact.isOnline}
              index={index}
              handleDeleteContactButton={handleDeleteContactButton}
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
