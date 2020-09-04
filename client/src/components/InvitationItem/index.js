import React, { memo } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import { Typography, ListItem, Button, Box } from "@material-ui/core";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const InvitationItem = ({
  email,
  handleApproveContact,
  handleRejectContact,
}) => {
  const { width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Typography variant="body2" className={classes.typography} gutterBottom>
        {email}
      </Typography>
      <Box component="span">
        <Button
          variant="outlined"
          size={width > 400 ? "small" : "medium"}
          color="primary"
          onClick={() => handleApproveContact(email)}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          size={width > 400 ? "small" : "medium"}
          color="secondary"
          style={{ marginLeft: 10 }}
          onClick={() => handleRejectContact(email)}
        >
          Reject
        </Button>
      </Box>
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
