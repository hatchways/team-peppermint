import React, { useState, useEffect, useRef, useContext, memo } from "react";
import { useStyles } from "./style";
import { TextField, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from "axios";
import SelectConversation from "../../context/SelectConversation";
import ToggleLanguage from "../../context/ToggleLanguage";
import "emoji-mart/css/emoji-mart.css";
import {
  uploadUserImage,
  deleteUserImage,
} from "../../services/uploadDeleteUserImage";
import PictureModal from "../../components/PictureModal";
import { useContactsState, useContactsDispatch, updateContacts } from "../../context/contacts/contactsContext";
import { fetchConversations, useConversationsDispatch } from "../../context/conversations/conversationsContext"
import { loadMessages, createMessageObject } from "./helper";
import ImageInputView from "../../components/ImageInputView";
import EmojiButton from "../../components/EmojiButton";
import AddPhotoButton from "../../components/AddPhotoButton";


const MessageField = ({ user }) => {
  let currentTime, senderData;
  const classes = useStyles();
  const dispatch = useContactsDispatch();
  const dispatchConv = useConversationsDispatch();
  const { contacts, unknownUsers } = useContactsState();
  const context = useContext(SelectConversation);

  const ToggleLanguageContext = useContext(ToggleLanguage);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersData, setUsersData] = useState({});
  const [languages, setLanguages] = useState("");
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);

  const [imageEl, setImageEl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeScreenPicture, setLargeScreenPicture] = useState(null);
  const handleSendMessage = (e) => (e.key === "Enter" ? sendMessage(e) : null);

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
  const handleCloseSmallImage = async () => {
    await deleteUserImage(imageUrl.name);
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
          socket.emit('message', msg, context.conversation, () => {
            saveMessage(msg)
            setMessage('')
            setImageUrl(null);
            scrollToBottom();
            if (messages.length === 0)
              fetchConversations(user.email, dispatchConv);
          })
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
    setUsersData({ ...contacts, ...unknownUsers });
  }, [contacts, unknownUsers])
  useEffect(() => {
    socket.emit('join', { email: user.email, room: context.conversation }, (error) => {
      if (error) alert(error);
    });
  }, [context.conversation, user.email])
  useEffect(() => {
    setMessages([]);
    socket.on("onlineUsers", (data) => {
      updateContacts(data, contacts, dispatch);
    });
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
      fetchConversations(user.email, dispatchConv);
    })
    if (context.conversation !== undefined) {
      loadMessages(user.email, context.conversation, setMessages, setUsers, usersData, unknownUsers, dispatch);
    }
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [context.conversation, user, unknownUsers, dispatch, usersData, contacts])
  useEffect(() => {
    if (users.length > 0) {
      Axios.get(`/api/user/${users.join(",")}/languages`)
        .then((response) => {
          setLanguages(response.data.languages);
        })
        .catch((err) => console.log(err));
    }
  }, [users, usersData]);
  return (
    <div className={classes.root}>
      <div className={classes.messegesView}>
        {!!messages.length > 0 && messages.map((msg, i) => {
          if (msg && (msg.textVersions || msg.image)) {
            senderData = usersData ? usersData[msg.sender] : undefined;
            return (
              <div key={i}>
                <MessageItem
                  sender={msg.sender === user.email ? user : senderData}
                  date={msg.date}
                  text={
                    msg.textVersions
                      ? ToggleLanguageContext.original
                        ? msg.textVersions[Object.keys(msg.textVersions)[0]]
                        : msg.textVersions[user.language]
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
                <ImageInputView
                  imageUrl={imageUrl}
                  handleClose={handleCloseSmallImage}
                />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <EmojiButton
                conversation={context.conversation}
                setMessage={setMessage}
              />
              <AddPhotoButton
                handleImageSelector={handleImageSelector}
                conversation={context.conversation}
                imageEl={imageEl}
                handleImageSave={handleImageSave}
                handleClose={handleImageSelectorClose}
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
