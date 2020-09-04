import React, { useState, useEffect } from "react";
import InvitationDialog from "../InvitationDialog";
import { useStyles } from "./style";
import { List, Typography, ButtonBase } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import {
  useContactsDispatch,
  useContactsState,
  deleteContact,
  userEmailFromLocalStorage,
} from "../../context/contacts/contactsContext";
import { useUserState } from "../../context/user/userContext";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import CreateGroupChat from "../../components/CreateGroupChat";


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
  const [openGroupChatForm, setOpenGroupChatForm] = useState(false);
  const openChatForm = () => {
    setOpenGroupChatForm(true);
  };
  const closeChatForm = () => {
    setOpenGroupChatForm(false);
  };
  const alertSuccess = () => {
    setIsAlertOpen(true);
    setTimeout(() => {
      showInviteDialog(false);
      setIsAlertOpen(false);
    }, 3000);
  }
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
        axios.get(`/api/user/${email}`)
          .then(async (response) => {
            res = await axios.post(`/user/${userEmail}/invite`, { contact: email });
            alertSuccess();
          })
          .catch(async (err) => {
            if (err.response.status === 404) {
              res = await axios.post(`/mail/${email}/sendMail`, {
                referrer: user.id,
              });
              res.data && alertSuccess();
            }
            else {
              setAlertError(err.message);
              setTimeout(() => {
                setIsAlertOpen(false);
              }, 3000);
            }
          })
      }

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
      <ButtonBase onClick={() => openChatForm()} style={{ marginBottom: 10 }}>
        <div className={classes.inviteFriendsContainer}>
          <GroupAddIcon color="primary" />
          <Typography
            variant="body2"
            color="primary"
            className={classes.typography}
            gutterBottom
          >
            Create Group Chat
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
      <CreateGroupChat
        open={openGroupChatForm}
        onClose={closeChatForm}
        contactsList={contacts}
      />
      <List className={classes.root}>
        {!!contacts ? (
          Object.keys(contacts).map((key, index) => (
            <ContactItem
              key={index}
              name={contacts[key].name}
              email={key}
              pictureUrl={contacts[key].pictureUrl}
              isOnline={contacts[key].isOnline}
              index={index}
              handleDeleteContactButton={handleDeleteContactButton}
              contact={contacts[key]}
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
