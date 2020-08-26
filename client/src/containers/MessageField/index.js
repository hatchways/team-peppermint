import React, { useState, useEffect, useRef, useContext } from "react";
import { useStyles } from "./style";
import { Grid, TextField } from "@material-ui/core"
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from 'axios';
import SelectConversation from "../../Context/SelectConversation"
import { translateText } from "../../Context/messages/helper"
import ISO6391 from 'iso-639-1';
import ToggleLanguage from "../../Context/ToggleLanguage";

const getVersion = (versions, language) => {
  return versions.find((version) => version.language === language);
}

const MessageField = ({ user }) => {
  let currentTime, msgVersion, convo;
  const classes = useStyles();
  const context = useContext(SelectConversation);
  const ToggleLanguageContext = useContext(ToggleLanguage);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const [languages, setLanguages] = useState('');
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const createMessageObject =async (date, text) => {
    let newMsg = {
      sender: user.email,
      date: date,
      textVersions: []
    }
    newMsg.textVersions.push({
      language: user.language,
      text: text
    })
    console.log(languages)
    if (languages) {
      await Promise.all(languages.map(async (language) => {
        if (language !== user.language) {
          newMsg.textVersions.push({
            language: language,
            text: await translateText(text, ISO6391.getCode(language))
          })
        }
      }))
    }
    return newMsg;
  }
  const loadMessages = async () => {
    convo = null;
    try { convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`) }
    catch (err) { console.log(err) }
    if (convo) {
      setMessages(convo.data.conversation.messages)
      setUsers(convo.data.conversation.users)
    }
  }
  const saveMessage = async (msg) => {
    convo = null;
    try { convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`) }
    catch (err) { console.log(err) }
    if (!convo) {
      try { await Axios.post(`http://localhost:3001/user/${user.email}/conversation`, context.conversation.split('-')) }
      catch (err) { console.log(err) }
    }
    await Axios.post(`http://localhost:3001/user/${user.email}/conversation/${room}/newMessage`, msg)
  }
  const sendMessage = async (event) => {
    event.preventDefault();
    currentTime = new Date().toISOString();
    if (message) {
      createMessageObject(currentTime, message)
        .then((msg) => {
          console.log(msg)
          socket.emit('message', msg, () => {
            saveMessage(msg)
            setMessage('')
            scrollToBottom()
          })

        })
        .catch((err) => console.log(err))

    }
  }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages])
  useEffect(() => {
    setMessages([]);
    setRoom(context.conversation);
  }, [context.conversation])
  useEffect(() => {
    loadMessages();
    socket.on('message', message => {
      console.log(message)
      setMessages(messages => [...messages, message])
    })
    socket.emit('join', { email: user.email, room }, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [room])
  useEffect(() => {
    if (users)
      Axios.get(`/api/user/${users.join(',')}/languages`)
        .then((response) => { setLanguages(response.data.languages) })
        .catch((err) => console.log(err))
  }, [users])
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
                  text={ToggleLanguageContext.original ? msg.textVersions[0].text : msgVersion ? msgVersion.text : msg.textVersions[0].text}
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
        onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
        autoComplete='off'
        fullWidth
        disabled={Object.keys(context.conversation).length === 0}
      />
    </div>
  );

};

export default MessageField;
