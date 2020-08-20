import React, { useReducer, useContext, useCallback } from "react";
import combineReducers from "react-combine-reducers";
import contactsReducer from "./contactsReducer";
import invitationsReducer from "./invitationsReducer";
import { fetchContacts, deleteContact, fetchInvitations } from "./helper";

const ContactsStateContext = React.createContext();
const ContactsDispatchContext = React.createContext();

const [rootReducerCombined, initialStateCombined] = combineReducers({
  contacts: [contactsReducer, { contacts: [] }],
  invitations: [invitationsReducer, { invitations: [] }],
});

function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );

  return (
    <ContactsStateContext.Provider value={state}>
      <ContactsDispatchContext.Provider value={dispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsStateContext.Provider>
  );
}

function useContactsState() {
  const context = useContext(ContactsStateContext);
  if (context === undefined) {
    throw new Error("useContactsState must be used within a ContactsProvider");
  }
  return context;
}
function useContactsDispatch() {
  const context = useContext(ContactsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useContactsDispatch must be used within a ContactsProvider"
    );
  }
  return context;
}

export {
  ContactsProvider,
  useContactsState,
  useContactsDispatch,
  fetchContacts,
  deleteContact,
  fetchInvitations,
};
