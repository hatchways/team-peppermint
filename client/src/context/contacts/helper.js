import { FETCH_CONTACTS, DELETE_CONTACT } from "../../types";
import axios from "axios";

export const fetchContacts = async (email, dispatch) => {
  const userData = await axios.get(`/user/${email}/contacts`);

  if (!userData.data) {
    throw Error("Sorry, no contacts found");
  }

  dispatch({
    type: FETCH_CONTACTS,
    payload: userData.data,
  });
};

export const deleteContact = async (email, index, dispatch) => {
  // const contacts = await axios.delete(`user/${email}/contacts`);

  // if (!contacts.data) {
  //   throw Error("Sorry, failed to delete contact");
  // }

  dispatch({ type: DELETE_CONTACT, payload: { email, index } });
};


