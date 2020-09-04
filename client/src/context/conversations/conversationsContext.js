import React, { useReducer, useContext } from "react";
import conversationsReducer from "./conversationsReducer";
import { fetchConversations } from "./helper";

const ConversationsStateContext = React.createContext();
const ConversationsDispatchContext = React.createContext();

function ConversationsProvider({ children }) {
  const [state, dispatch] = useReducer(conversationsReducer, {
    conversations: []
  });

  return (
    <ConversationsStateContext.Provider value={state}>
      <ConversationsDispatchContext.Provider value={dispatch}>
        {children}
      </ConversationsDispatchContext.Provider>
    </ConversationsStateContext.Provider>
  );
}

function useConversationsState() {
  const context = useContext(ConversationsStateContext);
  return context;
}
function useConversationsDispatch() {
  const context = useContext(ConversationsDispatchContext);
  return context;
}

export {
  ConversationsProvider,
  useConversationsState,
  useConversationsDispatch,
  fetchConversations,
};
