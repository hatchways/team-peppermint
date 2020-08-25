import React, { memo } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import { Typography, ListItem, Button } from "@material-ui/core";

const InvitationItem = ({
  email,
  index,
  handleApproveContact,
  handleRejectContact,
}) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Typography variant="body2" className={classes.typography} gutterBottom>
        {email}
      </Typography>
      <span>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleApproveContact(email)}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{ marginLeft: 10 }}
          onClick={() => handleRejectContact(email)}
        >
          Reject
        </Button>
      </span>
    </ListItem>
  );
};

export default memo(InvitationItem);

InvitationItem.propTypes = {
  email: PropTypes.string,
  index: PropTypes.number,
  handleApproveContact: PropTypes.func.isRequired,
  handleRejectContact: PropTypes.func.isRequired,
};
