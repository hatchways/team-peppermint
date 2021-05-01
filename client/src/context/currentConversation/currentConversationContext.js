import React, { createContext, useContext, useEffect, useReducer } from 'react'
import ConversationServices from 'services/apiCalls/conversation.services'
import Action, { ActionTypes } from 'types'
import CurrentConversationReducer from './currentConversationReducer'
const CurrentConversationStore = createContext()
const CurrentConversationDispatch = createContext()
const initialState = {
    _id: '',
    conversationID: '',
    conversationTitle: '',
    users: '',
    messages: [],
    lastMessage: ''
}
const CurrentConversationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CurrentConversationReducer, initialState)


    useEffect(() => {
        if (state._id !== '')
            ConversationServices.fetchConversationById(state._id)
                .then((response) => {
                    dispatch(Action(ActionTypes.SET_MESSAGES, response.data.conversation.messages));
                })
                .catch((err) => console.log(err))
    }, [state._id])
    return (
        <CurrentConversationStore.Provider value={state}>
            <CurrentConversationDispatch.Provider value={dispatch}>
                {children}
            </CurrentConversationDispatch.Provider>
        </CurrentConversationStore.Provider >
    )
}
export const useCurrentConversationStore = () => useContext(CurrentConversationStore)
export const useCurrentConversationDispatch = () => useContext(CurrentConversationDispatch)
export default CurrentConversationProvider