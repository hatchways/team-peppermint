import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import { List, Typography } from "@material-ui/core";
import InvitationItem from "../../components/InvitationItem";
import {
  useContactsDispatch,
  useContactsState,
  fetchContactsAndInvitations,
  approveContact,
  rejectContact,
} from "../../context/contacts/contactsContext";
const jwtDecode = require("jwt-decode");

const InvitationsList = () => {
  const [invitationsList, setInvitationsList] = useState([]);
  const classes = useStyles();

  const dispatch = useContactsDispatch();
  const { invitations } = useContactsState();

  const userToken = localStorage.getItem("auth-token");
  const decodedToken = jwtDecode(userToken);

  useEffect(() => {
    decodedToken.id &&
      !invitations.length &&
      fetchContactsAndInvitations(decodedToken.id, dispatch);
  }, []);

  useEffect(() => {
    setInvitationsList(invitations);
  }, [invitations]);

  const handleApproveContact = (emailToApprove) =>
    approveContact(decodedToken.id, emailToApprove, dispatch);

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
