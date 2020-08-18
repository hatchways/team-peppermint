import React, { useReducer, useContext } from "react";
import contactsReducer from "./contactsReducer";
import { fetchContacts, deleteContacts } from "./helper";

const ContactsStateContext = React.createContext();
const ContactsDispatchContext = React.createContext();

function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, {
    contacts: [],
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
  deleteContacts,
};
