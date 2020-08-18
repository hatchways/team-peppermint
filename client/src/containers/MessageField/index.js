import React, {useState, useEffect, useRef} from "react";
import { useStyles } from "./style";
import { Grid, TextField } from "@material-ui/core"
import MessageItem from "../../components/MessageItem";
import socket from "../../socket-client/socket";

const MessageField = () => {
  const classes = useStyles();
  const [messages, setMessages]=useState([]);
  const [message, setMessage]=useState('');
  const messagesEndRef = useRef(null);
  const room="room4";
  let name, currentTime;
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
};

export default MessageField;
