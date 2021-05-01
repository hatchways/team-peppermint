import React from "react";
import { useStyles } from "./style";
import { Typography  } from "@material-ui/core";
import ISO6391 from 'iso-639-1';
import { useLanguageContext, getMessageTextVersion } from "context/language/languageContext";
import { useUserStore } from "context/user/userContext";


import { dateToString } from 'utils/dateUtils'
import UserAvatar from "components/UserAvatar";
const MessageItem = (props) => {
  const { sender, createdAt, textVersions, isMyMessage } = props
  const { user } = useUserStore()
  const { isOriginalLanguage } = useLanguageContext()
  const classes = useStyles(props)

  if (sender)
    return (
      <div className={classes.root}>
        {!isMyMessage &&  <UserAvatar />}
        <div className={classes.messageContianer}>

          <div className={classes.messageDetails}>
            {!isMyMessage && 
              <Typography variant='body2'>

                <img
                  className={classes.imageIcon}
                  alt={sender.language}
                  src={`https://unpkg.com/language-icons/icons/${ISO6391.getCode(sender.language)}.svg`}
                />
                {sender.name}
              </Typography>

            }
            <Typography variant='caption'>{dateToString(createdAt)}</Typography>
          </div>
          <div className={classes.messageBox}>
            {getMessageTextVersion({ textVersions }, isOriginalLanguage, user.language)}
          </div>
        </div>
      </div>
    );
  else return null;
};
export default MessageItem;
