import React, {useState, useEffect, useRef, useContext} from "react";
import { useStyles } from "./style";
import { Grid, TextField } from "@material-ui/core"
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";
import Axios from 'axios';
import UserContext from '../../Context/UserContext';

const MessageField = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [messages, setMessages]=useState([]);
  const [message, setMessage]=useState('');
  const [conversationID, setConversationID]=useState('');
  const [user, setUser]=useState({});
  const messagesEndRef = useRef(null);
  const room="room4";
  let name, currentTime;
  const loadMessages = async ()=>{
    let convo;
    let users = ['zxcv@mail.ca', user.email]
    users.sort();
    try{
      convo =await Axios.get(`http://localhost:3001/user/conversation/${users.join('-')}`)
    }
    catch(err){console.log(err)}
    //setMessages()
  }
  const saveMessage=async (msg, date)=>{
    let users = ['zxcv@mail.ca', user.email]
    users.sort();
    let convo;

    try{
      convo =await Axios.get(`http://localhost:3001/user/conversation/${users.join('-')}`)
    }
    catch(err){console.log(err)}

    if(!convo){
      try{
        console.log(users)
        await Axios.post(`http://localhost:3001/user/${user.email}/conversation`, users)
        users.sort();
      }catch(err){console.log(err)}
    }
    let newMsg = {
      date: date,
      textVersion: {
        language: "english",
        text: msg
      }
    }
    await Axios.post(`http://localhost:3001/user/${user.email}/conversation/${users.join('-')}/newMessage`, newMsg)

  }
  useEffect(()=>{
    setUser(userContext.userData.user)
  },[userContext])
  useEffect(()=>{
    
    name = socket.id;
    socket.emit('join', {name, room}, (error)=>{
      if(error) {
        alert(error);
      }
    });
    return ()=>{
      socket.emit('disconnect');
      socket.off();
    }
    
  },[room])

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages(messages=>[...messages, message])
    })
  }, [])

  const sendMessage=(event)=>{
    currentTime=new Date();
    console.log(messages)
    event.preventDefault();
    if(message){
      socket.emit('message', message, `${currentTime.getHours()}:${currentTime.getMinutes()}`, ()=>{
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
  if(user)
  return (
    <div className={classes.root}>  
      <div className={classes.messegesView}>
        {messages.map((msg,i)=>
            <div key={i}> 
              <MessageItem 
                name={msg.name}
                date={msg.time}
                text={msg.text}
                myMessage={msg.user===socket.id} />
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <TextField
                className={classes.messageInput}
                variant="outlined"
                placeholder="message..."
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
                autoComplete='off'
                fullWidth
            />
    </div>
  );
  else return null
};

export default MessageField;
