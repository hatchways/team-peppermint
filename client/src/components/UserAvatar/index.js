import React, { memo } from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import defaultAvatar from "./default.png";
import avatar from './avatar.png'
import { useStyles, OfflineBadge, OnlineBadge } from "./style";

const UserAvatar = ({ imageUrl, isOnline }) => {
  const classes = useStyles();

  let userPicture = imageUrl || avatar;

  return (
    <div className={classes.root}>
      {isOnline ? (
        <OnlineBadge
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
        </OnlineBadge>
      ) : (
        <OfflineBadge
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
        </OfflineBadge>
      )}
    </div>
  );
};

export default memo(UserAvatar);

UserAvatar.propTypes = {
  imageUrl: PropTypes.string,
  isOnline: PropTypes.bool,
};
