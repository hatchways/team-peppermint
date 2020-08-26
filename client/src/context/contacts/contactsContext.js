import React, { useReducer, useContext } from "react";
import contactsInvitaitionsReducer from "./contactsInvitationsReducer";
import {
  fetchContactsAndInvitations,
  deleteContact,
  approveContact,
  rejectContact,
  userEmailFromLocalStorage,
  createInvitation,
} from "./helper";

const ContactsStateContext = React.createContext();
const ContactsDispatchContext = React.createContext();

function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsInvitaitionsReducer, {
    contacts: [],
    invitations: [],
  });

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
  return context;
}
function useContactsDispatch() {
  const context = useContext(ContactsDispatchContext);
  return context;
}

export {
  ContactsProvider,
  useContactsState,
  useContactsDispatch,
  fetchContactsAndInvitations,
  deleteContact,
  approveContact,
  rejectContact,
  userEmailFromLocalStorage,
  createInvitation,
};
