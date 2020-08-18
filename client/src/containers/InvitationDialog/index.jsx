import React, { useState} from "react";
import { TextField , Button, Typography } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const InvitationDialog = (props) =>{
    
    const [linkToCopy, setlinkToCopy] = useState('share.link');
    const [copied, setCopied] = useState(false);
    return (
            <Dialog 
                fullWidth={true}
                open={props.open} 
                onClose ={props.onClose} 
                aria-labelledby="invitation-dialog-title"
                
            >
 
                <DialogContent 
                    style={{
                        margin: "10%"
                    }}
                >
                    <DialogTitle id="invitation-dialog-title">
                        <Typography style={{ fontWeight: 600 }}>
                            Invite friends to messenger
                        </Typography>                    
                    
                    </DialogTitle>
                    <DialogContentText mx="auto" >
                        Send your friends an invite email 
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="emailToInvite"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                    />
                    <DialogContentText>
                       Or share referral link
                    </DialogContentText>
                    <TextField
                        disabled 
                        
                        id="linkToInvite"
                        variant="outlined"
                        value={linkToCopy}
                        fullWidth 
                        InputProps={{
                            endAdornment:
                            (<InputAdornment position="end">
                                
                                <CopyToClipboard text={linkToCopy}
                                    onCopy={() =>setCopied(true)}>
                                    <Button variant="contained" color="primary">Copy</Button>
                                </CopyToClipboard>
                            </InputAdornment>)
                            
                        }}   
                        

                    />
                    <DialogActions>
                        <Button  color="primary">
                            Send Invite
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        );
}
export default InvitationDialog;