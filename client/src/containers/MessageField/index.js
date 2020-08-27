import React, { useState, useEffect, useRef, useContext, memo } from "react";
import { useStyles, StyledMenu } from "./style";
import { TextField, InputAdornment, ButtonBase } from "@material-ui/core";
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from "axios";
import SelectConversation from "../../context/SelectConversation";
import { translateText } from "../../context/messages/helper";
import ISO6391 from "iso-639-1";
import ToggleLanguage from "../../context/ToggleLanguage";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const getVersion = (versions, language) => {
  return versions.find((version) => version.language === language);
};

const MessageField = ({ user }) => {
  let currentTime, msgVersion, convo;
  const classes = useStyles();
  const context = useContext(SelectConversation);
  const ToggleLanguageContext = useContext(ToggleLanguage);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState();
  const [languages, setLanguages] = useState("");
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedEmoji = () => {
    setAnchorEl(null);
  };

  const createMessageObject = async (date, text) => {
    let newMsg = {
      sender: user.email,
      date: date,
      textVersions: [],
    };
    newMsg.textVersions.push({
      language: user.language,
      text: text,
    });
    console.log(languages);
    if (languages) {
      await Promise.all(
        languages.map(async (language) => {
          if (language !== user.language) {
            newMsg.textVersions.push({
              language: language,
              text: await translateText(text, ISO6391.getCode(language)),
            });
          }
        })
      );
    }
    return newMsg;
  };
  const loadMessages = async () => {
    convo = null;
    try {
      convo = await Axios.get(
        `http://localhost:3001/user/conversation/${room}`
      );
    } catch (err) {
      console.error(err);
    }
    if (convo) {
      setMessages(convo.data.conversation.messages);
      setUsers(convo.data.conversation.users);
    }
  };
  const saveMessage = async (msg) => {
    convo = null;
    try {
      convo = await Axios.get(
        `http://localhost:3001/user/conversation/${room}`
      );
    } catch (err) {
      console.error(err);
    }
    if (!convo) {
      try {
        await Axios.post(
          `http://localhost:3001/user/${user.email}/conversation`,
          context.conversation.split("-")
        );
      } catch (err) {
        console.error(err);
      }
    }
    await Axios.post(
      `http://localhost:3001/user/${user.email}/conversation/${room}/newMessage`,
      msg
    );
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    currentTime = new Date().toISOString();
    if (message) {
      createMessageObject(currentTime, message)
        .then((msg) => {
          socket.emit("message", msg, () => {
            saveMessage(msg);
            setMessage("");
            scrollToBottom();
          });
        })
        .catch((err) => console.log(err));
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setMessages([]);
    setRoom(context.conversation);
  }, [context.conversation]);
  useEffect(() => {
    loadMessages();
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.emit("join", { email: user.email, room }, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room, user.email]);
  useEffect(() => {
    if (users)
      Axios.get(`/api/user/${users.join(",")}/languages`)
        .then((response) => {
          setLanguages(response.data.languages);
        })
        .catch((err) => console.log(err));
  }, [users]);
  return (
    <div className={classes.root}>
      <div className={classes.messegesView}>
        {!!messages.length > 0 &&
          messages.map((msg, i) => {
            if (msg && msg.textVersions[0]) {
              msgVersion = getVersion(msg.textVersions, user.language);
              return (
                <div key={i}>
                  <MessageItem
                    name={msg.sender}
                    date={msg.date}
                    text={
                      ToggleLanguageContext.original
                        ? msg.textVersions[0].text
                        : msgVersion
                        ? msgVersion.text
                        : msg.textVersions[0].text
                    }
                    myMessage={msg.sender === user.email}
                  />
                </div>
              );
            } else return null;
          })}
        <div ref={messagesEndRef} />
      </div>
      <TextField
        className={classes.messageInput}
        autoFocus={true}
        variant="outlined"
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        autoComplete="off"
        fullWidth
        disabled={context.conversation ? false : true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ButtonBase
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleEmojiClick}
                disabled={context.conversation ? false : true}
                style={{ marginRight: 15 }}
              >
                <SentimentSatisfiedOutlinedIcon />
              </ButtonBase>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Picker
                  set="google"
                  onSelect={(emoji) => setMessage(emoji.native)}
                  emojiSize={20}
                  onClick={handleSelectedEmoji}
                />
              </StyledMenu>
              <ButtonBase
                aria-label="select image"
                onClick={() => console.log("Image selector clicked...")}
                disabled={context.conversation ? false : true}
              >
                <FileCopyOutlinedIcon />
              </ButtonBase>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default memo(MessageField);
