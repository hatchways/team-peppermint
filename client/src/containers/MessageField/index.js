import React, { useState, useEffect, useRef, useContext, memo } from "react";
import { useStyles, StyledMenu } from "./style";
import {
  TextField,
  InputAdornment,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";
import PropTypes from "prop-types";
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from "axios";
import SelectConversation from "../../context/SelectConversation";
import ToggleLanguage from "../../context/ToggleLanguage";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CloseIcon from "@material-ui/icons/Close";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { DropzoneDialog } from "material-ui-dropzone";
import uploadUserImage from "../../services/uploadUserImage";
import PictureModal from "../../components/PictureModal";
import { useContactsState } from "../../context/contacts/contactsContext";
import { getVersion, loadMessages, createMessageObject } from "./helper";

const MessageField = ({ user }) => {
  let currentTime, msgVersion, senderData;
  const classes = useStyles();
  const { contacts } = useContactsState();
  const context = useContext(SelectConversation);
  const ToggleLanguageContext = useContext(ToggleLanguage);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersData, setUsersData] = useState({});
  const [languages, setLanguages] = useState("");
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageEl, setImageEl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeScreenPicture, setLargeScreenPicture] = useState(null);

  const handleSendMessage = (e) => (e.key === "Enter" ? sendMessage(e) : null);

  const handleEmojiClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageSelector = (e) => {
    setImageEl(e.currentTarget);
  };

  const handleImageSelectorClose = () => {
    setImageEl(null);
  };

  const handleImageSave = async (files) => {
    setImageEl(null);
    const imageData = await uploadUserImage(files[0], null, user.email);
    setImageUrl(imageData);
  };

  const handleCloseSmallImage = () => {
    setImageUrl(null);
  };

  const handleModalOpen = (imageUrl) => {
    setLargeScreenPicture(imageUrl);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setLargeScreenPicture(null);
  };
  const saveMessage = async (msg) => {
    await Axios.post(
      `http://localhost:3001/user/${user.email}/conversation/${context.conversation}/newMessage`,
      msg
    );
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    currentTime = new Date().toISOString();
    if (message || imageUrl) {
      createMessageObject(currentTime, message, user, languages, imageUrl)
        .then((msg) => {
          socket.emit('message', msg, () => {
            saveMessage(msg)
            setMessage('')
            setImageUrl(null);
            scrollToBottom()
          })
        })
        .catch((err) => console.log(err))
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setUsersData(prevState => {
      contacts.forEach((contact) => {
        prevState[contact.email] = {
          name: contact.name,
          language: contact.language,
          pictureUrl: contact.pictureUrl
        }
      })
      return prevState;
    });
  }, [contacts])
  useEffect(() => {
    setMessages([]);
    if (context.conversation !== undefined) {
      loadMessages(context.conversation, setMessages, setUsers, usersData, setUsersData, user.email);
      socket.on('message', message => {
        setMessages(messages => [...messages, message])
      })
      socket.emit('join', { email: user.email, room: context.conversation }, (error) => {
        if (error) alert(error);
      });
    }
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [context.conversation, user])
  useEffect(() => {
    if (users.length > 0) {
      Axios.get(`/api/user/${users.join(',')}/languages`)
        .then((response) => { setLanguages(response.data.languages) })
        .catch((err) => console.log(err));
    }
  }, [users, usersData])


  return (
    <div className={classes.root}>
      <div className={classes.messegesView}>
        {!!messages.length > 0 && messages.map((msg, i) => {
          if (msg && (msg.textVersions[0] || msg.image)) {
            msgVersion = getVersion(msg.textVersions, user.language);
            senderData = usersData ? usersData[msg.sender] : undefined;
            return (
              <div key={i}>
                <MessageItem
                  sender={msg.sender === user.email ? user : senderData}
                  date={msg.date}
                  text={
                    msg.textVersions[0]
                      ? ToggleLanguageContext.original
                        ? msg.textVersions[0].text
                        : msgVersion
                          ? msgVersion.text
                          : msg.textVersions[0].text
                      : null}
                  myMessage={msg.sender === user.email}
                  image={msg.image ? msg.image : null}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose} />
              </div>)

          }
          else return null
        })}
        <div ref={messagesEndRef} />
      </div>
      <PictureModal
        open={modalOpen}
        handleModalClose={handleModalClose}
        src={largeScreenPicture && largeScreenPicture}
      />
      <TextField
        className={classes.messageInput}
        autoFocus={true}
        variant="outlined"
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => handleSendMessage(e)}
        autoComplete="off"
        fullWidth
        disabled={context.conversation ? false : true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {imageUrl !== null && (
                <div
                  style={{
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <ButtonBase
                    style={{
                      position: "absolute",
                      top: -5,
                      left: 60,
                    }}
                    onClick={handleCloseSmallImage}
                  >
                    <CloseIcon />
                  </ButtonBase>
                  <img
                    src={imageUrl.url}
                    alt="userpicture"
                    width="50px"
                    height="50px"
                    style={{
                      borderRadius: 10,
                      display: "block",
                      outline: "none",
                    }}
                  ></img>
                </div>
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Choose an emoji" placement="top" arrow>
                <span>
                  <ButtonBase
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={handleEmojiClick}
                    disabled={context.conversation ? false : true}
                    style={{ marginRight: 15 }}
                  >
                    <SentimentSatisfiedOutlinedIcon />
                  </ButtonBase>
                </span>
              </Tooltip>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Picker
                  set="google"
                  title="Peppermint chat"
                  onSelect={(emoji) => setMessage(emoji.native)}
                  emojiSize={20}
                  onClick={handleClose}
                />
              </StyledMenu>
              <Tooltip title="Add photos" placement="top" arrow>
                <span>
                  <ButtonBase
                    aria-label="select image"
                    onClick={handleImageSelector}
                    disabled={context.conversation ? false : true}
                  >
                    <FileCopyOutlinedIcon />
                  </ButtonBase>
                </span>
              </Tooltip>
              <DropzoneDialog
                open={Boolean(imageEl)}
                onSave={handleImageSave}
                showPreviews={true}
                maxFileSize={3000000}
                onClose={() => {
                  handleImageSelectorClose();
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
export default memo(MessageField);

MessageField.propTypes = {
  user: PropTypes.shape({
    language: PropTypes.string,
    email: PropTypes.string,
  }),
};
