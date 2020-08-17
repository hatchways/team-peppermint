import React, { memo } from "react";
import Avatar from "@material-ui/core/Avatar";
import remy from "./men.png";
import { useStyles, StyledBadge } from "./style";

const UserAvatar = ({ imageUrl }) => {
  const classes = useStyles();

  let userPicture = imageUrl || remy;

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
          src={userPicture}
          className={classes.avatar}
        />
      </StyledBadge>
    </div>
  );
};

export default memo(UserAvatar);
