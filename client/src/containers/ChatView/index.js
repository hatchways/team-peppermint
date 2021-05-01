import React, { useEffect, useRef } from 'react'
import { useCurrentConversationDispatch, useCurrentConversationStore } from 'context/currentConversation/currentConversationContext'
import MessageItem from 'components/MessageItem'
import MessageInput from 'components/MessageInput'
import Action, { ActionTypes } from 'types'
import { useStyles } from './styles'
import { useUserStore } from 'context/user/userContext'
import ChatHeader from 'containers/ChatHeader'
const ChatView = () => {
    const { user, socket } = useUserStore()
    const { _id, messages, users } = useCurrentConversationStore()
    const currentConversationDispatch = useCurrentConversationDispatch()
    const classes = useStyles()
    const bottomDivRef = useRef()
    const scrollToBottom = () => bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    const getSenderData = (sender) => {
        return users.find(user => user._id === sender)
    }
    useEffect(scrollToBottom, [messages])
    useEffect(() => {
        socket.on(`${_id}-message`, messageData => {
            console.log('Message Pushed', _id)
            currentConversationDispatch(Action(ActionTypes.PUSH_MESSAGE, messageData))
        })
        return () => socket.off(`${_id}-message`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id])
    const messagesMap = () => {
        const output = messages.map(({ sender, ...rest }, idx) => {
            return <MessageItem
                key={idx}
                sender={getSenderData(sender)}
                {...rest}
                isMyMessage={sender === user._id}
            />
        })
        return output
    }
    return (
        <div className={classes.root}>
            <ChatHeader />
            <div className={classes.messagesContainer}>
                {messagesMap()}
                <div ref={bottomDivRef} />
            </div>
            <MessageInput />
        </div>

    )
}
export default ChatView