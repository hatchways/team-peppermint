import React, { useReducer, useContext, createContext, useEffect } from "react";
import ContactsReducer from "./contactsReducer";

import UserServices from "services/apiCalls/user.services";
import Action, { ActionTypes } from 'types'
import { useUserStore } from "context/user/userContext";

export const ContactsStore = createContext();
export const ContactsDispatch = createContext();

const initialState = {
    contacts: []
}
const ContactsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContactsReducer, initialState);
    const { isAuthenticated } = useUserStore()
    useEffect(() => {
        if (isAuthenticated)
            UserServices.getUserContacts()
                .then(response => dispatch(Action(ActionTypes.SET_CONTACTS, response.data.contacts)))
                .catch(err => console.error(err))

    }, [isAuthenticated])
    return (
        <ContactsStore.Provider value={state}>
            <ContactsDispatch.Provider value={dispatch}>
                {children}
            </ContactsDispatch.Provider>
        </ContactsStore.Provider>
    );
}

export const useContactsStore = () => useContext(ContactsStore)
export const useContactsDispatch = () => useContext(ContactsDispatch)
export default ContactsProvider
