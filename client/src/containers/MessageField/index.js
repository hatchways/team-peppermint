import React, { useState, useEffect, useRef, useContext } from "react";
import { useStyles } from "./style";
import { Grid, TextField } from "@material-ui/core"
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from 'axios';
import SelectContact from "../../Context/SelectContact"


const getVersion = (versions, language) => {
  return versions.find((version) => version.language === language);
}

const MessageField = ({ user }) => {

  const classes = useStyles();
  const context = useContext(SelectContact);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState([user.email, context.contact.email].sort().join('-'))
  const [currentLanguage, setCurrentLanguage] = useState('');


  const messagesEndRef = useRef(null);
  let currentTime, msgVersion;
  const loadMessages = async () => {
    let convo;
    try {
      convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`)
    }
    catch (err) { console.log(err) }
    if (convo) {
      setMessages(convo.data.conversation.messages)
    }
  }
  const saveMessage = async (msg, date) => {
    let convo;

    try {
      convo = await Axios.get(`http://localhost:3001/user/conversation/${room}`)
    }
    catch (err) { console.log(err) }

    if (!convo) {
      try {
        await Axios.post(`http://localhost:3001/user/${user.email}/conversation`, [context.contact.email, user.email])
      } catch (err) { console.log(err) }
    }
    let newMsg = {
      date: date,
      textVersion: {
        language: "english",
        text: msg
      }
    }
    await Axios.post(`http://localhost:3001/user/${user.email}/conversation/${room}/newMessage`, newMsg)

  }
  useEffect(() => {
    scrollToBottom();
  }, [messages])
  useEffect(() => {
    setRoom([user.email, context.contact.email].sort().join('-'));
    setMessages([]);
  }, [context.contact])
  useEffect(() => {
    loadMessages();
    socket.on('message', (message) => {
      console.log(messages);
      setMessages(messages => [...messages, {
        sender: message.user,
        date: message.time,
        textVersions: [{
          language: user.language,
          text: message.text
        }]

      }])
    })

    socket.emit('join', { email: user.email, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [room])



  const sendMessage = (event) => {
    event.preventDefault();
    currentTime = new Date();
    if (message) {
      socket.emit('message', { message, time: currentTime }, () => {
        saveMessage(message, currentTime)
        setMessage('')
        scrollToBottom()
      })
    }

  }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  //

  return (
    <div className={classes.root}>
      <div className={classes.messegesView}>
        {!!messages.length > 0 && messages.map((msg, i) => {

          if (msg) {
            msgVersion = getVersion(msg.textVersions, user.language);
            return (
              <div key={i}>
                <MessageItem
                  name={msg.sender}
                  date={msg.date}
                  text={msgVersion?msgVersion.text: msg.textVersions[0].text}
                  myMessage={msg.sender === user.email} />
              </div>)
          }
          else
            return null
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
      />
    </div>
  );

};

export default MessageField;
