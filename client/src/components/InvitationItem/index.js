import React, { memo } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import { Typography, ListItem, Button } from "@material-ui/core";

const InvitationItem = (props) => {
  const classes = useStyles();
  const { email, index } = props;

  return (
    <ListItem className={classes.root}>
      <Typography
        variant="body2"
        style={{ marginBottom: 0, fontWeight: 600 }}
        gutterBottom
      >
        {email}
      </Typography>
      <span>
        <Button variant="outlined" size="small" color="primary">
          Approve
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          style={{ marginLeft: 10 }}
        >
          Reject
        </Button>
      </span>
    </ListItem>
  );
};

export default memo(InvitationItem);
