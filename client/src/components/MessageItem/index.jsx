import React, { memo } from "react";
import { useStyles } from "./style";
import { Typography, Avatar, ButtonBase } from "@material-ui/core";
import ISO6391 from 'iso-639-1';
const MessageItem = (props) => {
  const classes = useStyles();
  const { sender, date, text, myMessage, image, handleModalOpen } = props;
  const localDate = new Date(date);
  const dateString = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if(sender)
  return (
    <div className={classes.root}>
      <div className={`${classes.messageView} ${myMessage ? 'my' : 'other'}`}>
        {!myMessage && <Avatar
          variant="circle"
          alt="Remy Sharp"
          src={sender.pictureUrl ? sender.pictureUrl.url : undefined}
        />
        }
        <div className={classes.messageInfo}>
          <Typography variant="body2" className={`${classes.messageDetails} ${myMessage ? 'my' : 'other'}`}>
            {sender.language && !myMessage &&
              <img
                alt={sender.language} 
                src={`https://unpkg.com/language-icons/icons/${ISO6391.getCode(sender.language)}.svg`} 
                width={"10%"} 
                height={"10%"} 
                style={{borderRadius:'10px', marginRight:'5px'}}></img>}
            {!myMessage ? sender.name : ''} {dateString}
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
  else return null;
};
export default memo(MessageItem);
