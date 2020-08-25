import React, { useState, useEffect, useRef, useContext, memo } from "react";
import { useStyles } from "./style";
import { TextField } from "@material-ui/core";
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from 'axios';
import SelectContact from "../../context/SelectContact"
import { translateText } from "../../context/messages/helper"
import ISO6391 from 'iso-639-1';

const getVersion = (versions, language) => {
  return versions.find((version) => version.language === language);
};

const MessageField = ({ user }) => {
  let currentTime, msgVersion, convo;
  const classes = useStyles();
  const context = useContext(SelectContact);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState([user.email, context.contact.email].sort().join('-'))
  const [contactLanguage, setContactLanguage] = useState('');
  const messagesEndRef = useRef(null);
  const createMessageObject = async (date, text) => {
    let newMsg = {
      sender: user.email,
      date: date,
      textVersions: []
    }
    newMsg.textVersions.push({
      language: user.language,
      text: text
    })

    if (contactLanguage !== user.language && contactLanguage) {
      let translated = await translateText(text, ISO6391.getCode(contactLanguage));
      newMsg.textVersions.push({
        language: contactLanguage,
        text: translated
      })
    }
    return newMsg;
  }
  const loadMessages = async () => {
    convo = null;
    try { convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`) }
    catch (err) { console.log(err) }
    if (convo) setMessages(convo.data.conversation.messages)
  }
  const saveMessage = async (msg) => {
    convo = null;
    try { convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`) }
    catch (err) { console.log(err) }
    if (!convo) {
      try { await Axios.post(`http://localhost:3001/user/${user.email}/conversation`, [context.contact.email, user.email]) }
      catch (err) { console.log(err) }
    }
    await Axios.post(`http://localhost:3001/user/${user.email}/conversation/${room}/newMessage`, msg)
  }
  const sendMessage = async (event) => {
    event.preventDefault();
    currentTime = new Date();
    if (message) {
      let newMsg = await createMessageObject(currentTime, message);
      socket.emit('message', newMsg, () => {
        saveMessage(newMsg)
        setMessage('')
        scrollToBottom()
      })
    }
  }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setRoom([user.email, context.contact.email].sort().join("-"));
    setMessages([]);
    Axios.get(`/api/user/${context.contact.email}/language`)
      .then((response) => setContactLanguage(response.data.language))
      .catch((err) => console.log(err))
    console.log(contactLanguage);
  }, [context.contact])
  useEffect(() => {
    loadMessages();
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })
    socket.emit('join', { email: user.email, room }, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [room])
  return (
    <div className={classes.root}>
      <div className={classes.messegesView}>
        {!!messages.length > 0 && messages.map((msg, i) => {
          if (msg && msg.textVersions[0]) {
            msgVersion = getVersion(msg.textVersions, user.language);
            return (
              <div key={i}>
                <MessageItem
                  name={msg.sender}
                  date={msg.date}
                  avatar={user.pictureURL.url}
                  text={msgVersion ? msgVersion.text : msg.textVersions[0].text}
                  myMessage={msg.sender === user.email} />
              </div>)
          }
          else return null
        })}
        <div ref={messagesEndRef} />
      </div>
      <TextField
        className={classes.messageInput}
        variant="outlined"
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        autoComplete="off"
        fullWidth
        disabled={Object.keys(context.contact).length === 0}
      />
    </div>
  );
};

export default memo(MessageField);
