import {
  FETCH_CONTACTS,
  DELETE_CONTACT,
  FETCH_INVITATIONS,
  APPROVE_INVITATION,
  RE,
} from "../../types";
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

export const fetchInvitations = async (email, dispatch) => {
  console.log("starting fetching invitations");
  const invitations = await axios.get(`/user/${email}/invitations`);
  if (!invitations.data) {
    throw Error("Sorry, no invitations found");
  }
  console.log("FETCH INVITATIONS FUNCTION FE ", invitations);
  dispatch({
    type: FETCH_INVITATIONS,
    payload: invitations.data,
  });
};
