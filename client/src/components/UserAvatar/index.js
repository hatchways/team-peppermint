import React from "react";
import Avatar from "@material-ui/core/Avatar";
import avatar from "./avatar.png";
import { useStyles } from "./style";
import AvatarBadge from "components/AvatarBadge";
const UserAvatar = ({ imageUrl, isOnline }) => {
  const classes = useStyles({ isOnline });
  let userPicture = "";

  if (
    imageUrl !== undefined &&
    imageUrl.url !== undefined &&
    imageUrl.url.includes("http")
  ) {
    userPicture = imageUrl.url;
  } else {
    userPicture = avatar;
  }

  return (
    <div className={classes.root}>
      <AvatarBadge isOnline={isOnline}>
        <Avatar
          variant="circular"
          alt="Badge"
          src={userPicture}
          className={classes.avatar}
        />
      </AvatarBadge>
    </div>
  );
};

export default UserAvatar;

