import React, { memo } from "react";
import { useStyles } from "./style";
import { Typography, Avatar, ButtonBase } from "@material-ui/core";
const MessageItem = (props) => {
  const classes = useStyles();
  const { name, date, avatar, text, myMessage, image, handleModalOpen } = props;
  const localDate = new Date(date);
  const dateString = localDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={classes.root}>
      <div className={`${classes.messageView} ${myMessage ? "my" : "other"}`}>
        {!myMessage && (
          <Avatar variant="circle" alt="Remy Sharp" src={avatar} />
        )}
        <div className={classes.messageInfo}>
          <Typography
            variant="body2"
            className={`${classes.messageDetails} ${
              myMessage ? "my" : "other"
            }`}
          >
            {!myMessage ? name : ""} {dateString}
          </Typography>
          <Typography
            variant="body1"
            className={`${classes.messageText} ${myMessage ? "my" : "other"}`}
          >
            {image !== null && (
              <ButtonBase
                onClick={() => handleModalOpen(image.url)}
                style={{ display: "block" }}
              >
                <img
                  src={image.url}
                  alt="userpicture"
                  width="150px"
                  height="150px"
                  className={classes.image}
                ></img>
              </ButtonBase>
            )}
            {text !== undefined && text}
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default memo(MessageItem);
