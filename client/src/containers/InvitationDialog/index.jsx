import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InvitationDialog = ({
  open,
  isAlertOpen,
  alertError,
  onClose,
  handleSendEmail,
}) => {
  const [email, setEmail] = useState("");

  const [linkToCopy, setlinkToCopy] = useState("share.link");
  const [copied, setCopied] = useState(false);
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={onClose}
      aria-labelledby="invitation-dialog-title"
    >
      <DialogContent
        style={{
          margin: "10%",
        }}
      >
        <DialogTitle id="invitation-dialog-title">
          <Typography style={{ fontWeight: 600 }}>
            Invite friends to messenger
          </Typography>
        </DialogTitle>
        <DialogContentText mx="auto">
          Send your friends an invite email
        </DialogContentText>
        <TextField
          autoFocus
          id="emailToInvite"
          label="Email Address"
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <DialogContentText>Or share referral link</DialogContentText>
        <TextField
          disabled
          id="linkToInvite"
          variant="outlined"
          value={linkToCopy}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CopyToClipboard
                  text={linkToCopy}
                  onCopy={() => setCopied(true)}
                >
                  <Button variant="contained" color="primary">
                    Copy
                  </Button>
                </CopyToClipboard>
              </InputAdornment>
            ),
          }}
        />
        <DialogActions>
          <Button color="primary" onClick={() => handleSendEmail(email)}>
            Send Invite
          </Button>
        </DialogActions>
        <Collapse in={isAlertOpen}>
          {alertError ? (
            <Alert severity="error">{alertError}</Alert>
          ) : (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Email request successfuly sent
            </Alert>
          )}
        </Collapse>
      </DialogContent>
    </Dialog>
  );
};
export default InvitationDialog;

InvitationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  isAlertOpen: PropTypes.bool,
  alertError: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
  onClose: PropTypes.func.isRequired,
  handleSendEmail: PropTypes.func.isRequired,
};
