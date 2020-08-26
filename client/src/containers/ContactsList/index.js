import React, { useState } from "react";
import InvitationDialog from "../InvitationDialog";
import { useStyles } from "./style";
import { List, Typography, ButtonBase } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";
import {
  useContactsDispatch,
  useContactsState,  
  deleteContact,
  userEmailFromLocalStorage,
} from "../../context/contacts/contactsContext";
import { useUserState } from "../../context/user/userContext";
import axios from "axios";
import isEmail from "validator/lib/isEmail";

const ContactsList = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [copied, setCopied] = useState(false);

  const classes = useStyles();

  const [inviteDialog, showInviteDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertError, setAlertError] = useState(null);

  const openInviteDialog = () => {
    showInviteDialog(true);
    setAlertError(null);
  };
  const closeInviteDialog = () => {
    showInviteDialog(false);
    setAlertError(null);
  };

  const dispatch = useContactsDispatch();
  const { contacts } = useContactsState();
  const { user } = useUserState();

  const userEmail = userEmailFromLocalStorage();

  const handleDeleteContactButton = (email) => {
    deleteContact(userEmail, email, dispatch);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleSendEmail = async (email) => {
    const isEmailValid = isEmail(email);
    if (!isEmailValid) {
      setIsAlertOpen(true);
      setAlertError("Email is not valid. Please verify it is correct.");
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
      return;
    }
    try {
      let res = "";
      if (isEmailValid) {
        setAlertError(null);
        res = await axios.post(`/mail/${email}/sendMail`, {
          referrer: user.id,
        });
      }
      res.data && setIsAlertOpen(true);
      setTimeout(() => {
        showInviteDialog(false);
        setIsAlertOpen(false);
      }, 3000);
    } catch (err) {
      setAlertError(err.message);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      closeInviteDialog();
    }, 1000);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
      <InvitationDialog
        open={inviteDialog}
        isAlertOpen={isAlertOpen}
        alertError={alertError}
        userId={user.id}
        copied={copied}
        setCopied={setCopied}
        onClose={closeInviteDialog}
        onCopy={handleCopy}
        handleSendEmail={handleSendEmail}
      />
      <List className={classes.root}>
        {!!contacts.length ? (
          contacts.map((contact, index) => (
            <ContactItem
              key={index}
              name={contact.name}
              email={contact.email}
              pictureUrl={contact.pictureUrl}
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
