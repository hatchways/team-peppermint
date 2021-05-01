import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { Divider } from "@material-ui/core";
import ContactItem from "../../components/ContactItem";
import { useContactsStore } from 'context/contacts/contactsContext'
import SearchContact from "components/SearchContact";



const ContactsList = () => {
  const classes = useStyles()
  const { contacts } = useContactsStore()
  const [displayContacts, setDisplayContacts] = useState(contacts)
  const [unknownContacts, setUnknownContacts] = useState([])
  const removeContactFromList = (contact) => {
    setUnknownContacts(prevState => {
      let newState= prevState
      newState.splice(prevState.indexOf(contact))
      return newState
    })
  }
  useEffect(() => {
    console.log(unknownContacts)
  }, [unknownContacts])
  useEffect(() => {
    setDisplayContacts(contacts)
  }, [contacts])
  return (
    <div className={classes.root} >
      <SearchContact contacts={contacts} updateContactList={setDisplayContacts} updateUnknownList={setUnknownContacts} />
      {unknownContacts.map((contact, i) =>
        <ContactItem key={i} contact={contact} unknown removeFromUknown={removeContactFromList} />
      )}
      <Divider variant='middle' />
      {displayContacts.map((contact, i) =>
        <ContactItem key={i} contact={contact} />
      )}
    </div>
  );
};

export default ContactsList;
