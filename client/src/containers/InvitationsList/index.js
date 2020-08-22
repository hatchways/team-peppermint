import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import { List, Typography } from "@material-ui/core";
import InvitationItem from "../../components/InvitationItem";
import {
  useContactsDispatch,
  useContactsState,
  fetchContactsAndInvitations,
  approveContact,
  rejectContact,
  userEmailFromLocalStorage,
} from "../../context/contacts/contactsContext";

const InvitationsList = () => {
  const [invitationsList, setInvitationsList] = useState([]);
  const classes = useStyles();

  const dispatch = useContactsDispatch();
  const { invitations } = useContactsState();

  const userEmail = userEmailFromLocalStorage();

  useEffect(() => {
    userEmail &&
      !invitations.length &&
      fetchContactsAndInvitations(userEmail, dispatch);
  }, [userEmail, invitations.length, dispatch]);

  useEffect(() => {
    setInvitationsList(invitations);
  }, [invitations]);

  const handleApproveContact = (emailToApprove) =>
    approveContact(userEmail, emailToApprove, dispatch);

  const handleRejectContact = (emailToReject) =>
    rejectContact(userEmail, emailToReject, dispatch);

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {!!invitationsList.length ? (
          invitationsList.map((invitation, index) => (
            <InvitationItem
              key={index}
              email={invitation.email}
              index={index}
              handleApproveContact={handleApproveContact}
              handleRejectContact={handleRejectContact}
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
    </div>
  );
};
export default InvitationsList;
