import React, { useState, useEffect, useRef, useContext, memo } from "react";
import { useStyles } from "./style";
import { TextField } from "@material-ui/core";
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from 'axios';
import SelectConversation from "../../context/SelectConversation"
import ToggleLanguage from "../../context/ToggleLanguage";
import { useContactsState } from "../../context/contacts/contactsContext";
import { getVersion, loadMessages, createMessageObject } from "./helper"

const MessageField = ({ user }) => {
  let currentTime, msgVersion, senderData;
  const classes = useStyles();
  const { contacts } = useContactsState();
  const context = useContext(SelectConversation);
  const ToggleLanguageContext = useContext(ToggleLanguage);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState({});

  const [languages, setLanguages] = useState('');
  const messagesEndRef = useRef(null);

  const saveMessage = async (msg) => {
    await Axios.post(
      `http://localhost:3001/user/${user.email}/conversation/${context.conversation}/newMessage`,
      msg
    );
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    currentTime = new Date().toISOString();
    if (message) {
      createMessageObject(currentTime, message, user, languages)
        .then((msg) => {
          socket.emit('message', msg, () => {
            saveMessage(msg)
            setMessage('')
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
          if (msg && msg.textVersions[0]) {
            msgVersion = getVersion(msg.textVersions, user.language);
            senderData = usersData ? usersData[msg.sender] : undefined;
            return (
              <div key={i}>
                <MessageItem
                  sender={msg.sender === user.email ? user : senderData}
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
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        autoComplete="off"
        fullWidth
        disabled={context.conversation ? false : true}
      />
    </div>
  );
};
export default memo(MessageField);
