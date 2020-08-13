import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import { List } from "@material-ui/core";
import InvitationItem from "../../components/InvitationItem";

const InvitationsList = () => {
  const classes = useStyles();

  const invitationsList = [
    {
      from_user: "harry@gmail.com",
    },
    {
      from_user: "peter@gmail.com",
    },
    {
      from_user: "k5@gmail.com",
    },
    {
      from_user: "nose@gmail.com",
    },
    {
      from_user: "ear@gmail.com",
    },
    {
      from_user: "throat@gmail.com",
    },
    {
      from_user: "sun@gmail.com",
    },
    {
      from_user: "moon@gmail.com",
    },
    {
      from_user: "elephant@gmail.com",
    },
  ];

  return (
    <div className={classes.root}>     
      <List className={classes.root}>
        {invitationsList &&
          invitationsList.map((invitation, index) => (
            <InvitationItem key={index} email={invitation.from_user} />
          ))}
      </List>
    </div>
  );
};
export default InvitationsList;
