import {
  FETCH_CONTACTS_INVITATIONS,
  UPDATE_INVITATIONS,
  UPDATE_CONTACTS,
  RESET_LISTS,
} from "../../types";
import axios from "axios";

const jwtDecode = require("jwt-decode");

export const fetchContactsAndInvitations = async (email, dispatch) => {
  const userData = await axios.get(`/user/${email}/contacts`);
  if (!userData.data) {
    throw Error("Oops, no contacts found");
  }
  dispatch({
    type: FETCH_CONTACTS_INVITATIONS,
    payload: {
      contacts: userData.data.contactsList,
      invitations: userData.data.invitationsList,
    },
  });
};

export const deleteContact = async (userEmail, emailToDelete, dispatch) => {
  const contacts = await axios.delete(`user/${emailToDelete}/contacts`, {
    data: {
      userEmail,
    },
  });

  if (!contacts.data) {
    throw Error("Oops, failed to delete contact");
  }

  fetchContactsAndInvitations(userEmail, dispatch);
};

export const approveContact = async (userEmail, contactToApprove, dispatch) => {
  try {
    await axios.post(`user/${userEmail}/approve`, {
      data: {
        contactToApprove,
      },
    });

    fetchContactsAndInvitations(userEmail, dispatch);
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

export const rejectContact = async (userEmail, emailToReject, dispatch) => {
  try {
    await axios.post(`user/${userEmail}/reject`, {
      data: {
        contactToReject: emailToReject,
      },
    });

    const newInvitationsList = await axios.get(`user/${userEmail}/invitations`);

    dispatch({ type: UPDATE_INVITATIONS, payload: newInvitationsList });
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

export const createInvitation = async (userEmail, referrer) => {
  try {
    const res = await axios.post(`user/${userEmail}/invite`, {
      referrer,
    });
    return res.data;
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

export const updateContacts = async (
  onlineContactsList,
  contacts,
  dispatch
) => {
  try {
    contacts.forEach((contact) => {
      const isOnline = onlineContactsList.includes(contact.email);
      contact.isOnline = isOnline;
    });

    dispatch({
      type: UPDATE_CONTACTS,
      payload: contacts,
    });
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

export const findContacts = async (userEmail, query, dispatch) => {
  try {
    const res = await axios.post(`user/${userEmail}/search`, {
      query,
    });

    if (res.data.foundContactsList.length > 0) {
      dispatch({
        type: UPDATE_CONTACTS,
        payload: res.data.foundContactsList,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

export const resetContactsInvitationsLists = (dispatch) => {
  dispatch({
    type: RESET_LISTS,
  });
};

export const userEmailFromLocalStorage = () => {
  const userToken = localStorage.getItem("auth-token");
  let decodedToken = "Oops, no email found";
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }
  return decodedToken.id;
};
