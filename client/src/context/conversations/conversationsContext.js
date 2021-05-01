import React, { useReducer, useContext, createContext, useEffect } from "react";
import ConversationsReducer from "./conversationsReducer";

import UserServices from "services/apiCalls/user.services";
import Action, { ActionTypes } from 'types'
import { useUserStore } from "context/user/userContext";

export const ConversationsStore = createContext();
export const ConversationsDispatch = createContext();

const initialState = {
    conversations: []
}
const ConversationsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ConversationsReducer, initialState);
    const { isAuthenticated } = useUserStore()
    useEffect(() => {
        if (isAuthenticated)
            UserServices.getUserConversations()
                .then(response => {
                    dispatch(Action(ActionTypes.SET_CONVERSATIONS, response.data.conversations))
                })
                .catch(err => console.log(err))
    }, [isAuthenticated])
    return (
        <ConversationsStore.Provider value={state}>
            <ConversationsDispatch.Provider value={dispatch}>
                {children}
            </ConversationsDispatch.Provider>
        </ConversationsStore.Provider>
    );
}

export const useConversationsStore = () => useContext(ConversationsStore)
export const useConversationsDispatch = () => useContext(ConversationsDispatch)
export default ConversationsProvider
