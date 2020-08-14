import React from "react";
import Avatar from "@material-ui/core/Avatar";
import remy from "./men.png";
import { useStyles, StyledBadge } from "./style";

const UserAvatar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchororigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        <Avatar
          variant="circle"
          alt="Remy Sharp"
          src={remy}
          className={classes.avatar}
        />
      </StyledBadge>
    </div>
  );
};

export default UserAvatar;
