import React from "react";
import { useStyles } from "./style";
import { TextField , Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const InvitationDialog = (props) =>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Dialog open={props.open} onClose ={props.onClose} aria-labelledby="invitation-dialog-title">
                <DialogTitle id="invitation-dialog-title">Invite friends to messenger</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Send your friends an invite email 
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="emailToInvite"
                        label="Email Address"
                        type="email"
                    />
                    <DialogContentText>
                       Or share referral link
                    </DialogContentText>
                    <TextField
                        disabled 
                        margin="dense"
                        id="linkToInvite"
                        label="Share Link"
                    />
                </DialogContent>
                <DialogActions>
                    <Button  color="primary">
                        Send Invite
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
}
export default InvitationDialog;