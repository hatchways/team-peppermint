import React, {useState} from "react";
import PropTypes from "prop-types";
import  InvitationDialog  from "../InvitationDialog";
import { useStyles } from "./style";
import { List, Typography, Button } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import AddIcon from "@material-ui/icons/Add";

const ContactsList = () => {
  const classes = useStyles();

  const contactsList = [
    {
      name: "Ashanti",
    },
    {
      name: "Cheng",
    },
    {
      name: "Jeffrey",
    },
    {
      name: "Julia",
    },
    {
      name: "Stephen",
    },
    {
      name: "Andrey",
    },
    {
      name: "Tony",
    },
    {
      name: "Wendy",
    },
    {
      name: "Melania",
    },
    {
      name: "John",
    },
  ];
  const [inviteDiaolog, showInviteDialog]= useState(false);
  const openInviteDialog=()=>{
    showInviteDialog(true);
  }
  const closeInviteDialog=()=>{
    showInviteDialog(false);
  }

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
          <Button onClick={() => openInviteDialog()}>Invite Friends</Button>
          <InvitationDialog open ={inviteDiaolog} onClose = {closeInviteDialog}/>
        </Typography>
      </div>
      <List className={classes.root}>
        {contactsList &&
          contactsList.map((contact, index) => (
            <ContactItem key={index} name={contact.name} />
          ))}
      </List>
    </>
  );
};

export default ContactsList;
