import Sidebar from 'containers/Sidebar'
import React from 'react'
import CurrentConversationProvider from 'context/currentConversation/currentConversationContext'
import ChatView from 'containers/ChatView'
import { useStyles } from './styles'
const Home = () => {
    const classes = useStyles()
    return (
        <CurrentConversationProvider>
            <div className={classes.root}>
                <Sidebar />
                <ChatView />
            </div>
        </CurrentConversationProvider>
    )
}
export default Home