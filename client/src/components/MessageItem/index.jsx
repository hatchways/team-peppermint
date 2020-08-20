import React from "react";
import { useStyles } from "./style";
import {Typography, Avatar } from "@material-ui/core";
import remy from "../UserAvatar/men.png";
const MessageItem =(props)=>{
    const classes = useStyles();
    const {name, date, avatar, text, myMessage} = props;

    return(
        <div className={classes.root}>
            <div className={`${classes.messageView} ${myMessage?'my':'other'}`}>
                {!myMessage &&<Avatar
                    variant="circle"
                    alt="Remy Sharp"
                    src={remy}
                />}
                <div className={classes.messageInfo}>
                    <Typography variant="body2" className={`${classes.messageDetails} ${myMessage?'my':'other'}`}>
                        {!myMessage?name:''} {date}
                    </Typography>
                    <Typography variant="body1" className={`${classes.messageText} ${myMessage?'my':'other'}`}>
                        {text}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
export default MessageItem;