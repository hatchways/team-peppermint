import { FETCH_CONTACTS_INVITATIONS, UPDATE_INVITATIONS } from "../../types";
import axios from "axios";
const jwtDecode = require("jwt-decode");

export const fetchContactsAndInvitations = async (email, dispatch) => {
  const userData = await axios.get(`/user/${email}/contacts`);
  if (!userData.data) {
    throw Error("Sorry, no contacts found");
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
    throw Error("Sorry, failed to delete contact");
  }

  fetchContactsAndInvitations(userEmail, dispatch);
};

export const approveContact = async (userEmail, contactToApprove, dispatch) => {
  try {
    const message = await axios.post(`user/${userEmail}/approve`, {
      data: {
        contactToApprove,
      },
    });

    fetchContactsAndInvitations(userEmail, dispatch);
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

export const rejectContact = async (userEmail, emailToReject, dispatch) => {
  try {
    const msg = await axios.post(`user/${userEmail}/reject`, {
      data: {
        contactToReject: emailToReject,
      },
    });

    const newInvitationsList = await axios.get(`user/${userEmail}/invitations`);

    dispatch({ type: UPDATE_INVITATIONS, payload: newInvitationsList });
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

export const createInvitation = async (userEmail, referrer) => {
  try {
    await axios.post(`user/${userEmail}/invite`, {
      referrer,
    });
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

export const findInvitationByContactId = async (userEmail, referrer) => {
  try {    
    const res = await axios.post(`user/${userEmail}/invitationByContactId`,{
      referrer,
    });    
    return res.data;
  } catch (err) {    
    return null
  }
};

export const userEmailFromLocalStorage = () => {
  const userToken = localStorage.getItem("auth-token");
  let decodedToken = "Sorry no email found";
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }
  return decodedToken.id;
};
