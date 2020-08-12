import React, { useState }  from "react";
import { useStyles } from "./style";
import  InvitationDialog  from "../InvitationDialog";
import {Button} from '@material-ui/core';
const Sidebar = () => {
  const classes = useStyles();
  const [inviteDiaolog, showInviteDialog]= useState(false);
  const openInviteDialog=()=>{
    showInviteDialog(true);
  }
  const closeInviteDialog=()=>{
    showInviteDialog(false);
  }

  return (
    <section className={classes.root}>
        SIDEBAR
        <div>
          <Button variant="contained" onClick={() => openInviteDialog()}>Invite</Button>
          <InvitationDialog open ={inviteDiaolog} onClose = {closeInviteDialog}/>
        </div>
    </section>);
};

export default Sidebar;
