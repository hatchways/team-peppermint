import React, { useState } from "react";
import { Typography, Switch, ButtonBase, Badge, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { MoreHoriz, FiberManualRecord } from "@material-ui/icons";
import  InvitationDialog  from "../InvitationDialog";

const ChatNavBar = () => {
  const [checked, setChecked] = useState(false);
  const [inviteDiaolog, showInviteDialog]= useState(false);
  const classes = useStyles();

  const handleChange = () => {
    setChecked(!checked);
  };
  const openInviteDialog=()=>{
    showInviteDialog(true);
  }
  const closeInviteDialog=()=>{
    showInviteDialog(false);
  }
  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <Typography variant="h6" style={{ fontWeight: 600, marginLeft:20, marginRight:20 }}>
          Santiago
        </Typography>
        <div className={classes.onOfflineStyle}>
          <FiberManualRecord style={{ fontSize: 14, color: "#98FB98" }} />
          <Typography variant="body2" style={{ fontSize: "0.8rem" }}>
            Online
          </Typography>
        </div>
        <div>
          <Button variant="contained" onClick={() => openInviteDialog()}>Invite</Button>
          <InvitationDialog open ={inviteDiaolog} onClose = {closeInviteDialog}/>
        </div>
      </div>
      <div className={classes.leftRightSideStyle}>
        <Typography variant="body2" style={{ fontSize: "0.8rem" }}>
          Original language
        </Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          color="primary"
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <ButtonBase         
          onClick={() => console.log("Clicked")}
          style={{ marginLeft: 20 }}
        >
          <MoreHoriz />
        </ButtonBase>
      </div>
    </div>
  );
};

export default ChatNavBar;
