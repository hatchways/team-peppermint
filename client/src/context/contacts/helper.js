import {
  FETCH_CONTACTS_INVITATIONS,
  DELETE_CONTACT,
  UPDATE_INVITATIONS,
} from "../../types";
import axios from "axios";

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

export const deleteContact = async (
  userEmail,
  emailToDelete,
  index,
  dispatch
) => {
  const contacts = await axios.delete(`user/${emailToDelete}/contacts`, {
    data: {
      userEmail,
    },
  });

  if (!contacts.data) {
    throw Error("Sorry, failed to delete contact");
  }

  dispatch({ type: DELETE_CONTACT, payload: { emailToDelete, index } });
};

export const approveContact = async (userEmail, contactToApprove, dispatch) => {
  try {
    const message = await axios.post(`user/${userEmail}/approve`, {
      data: {
        contactToApprove,
      },
    });

    console.log("Contact approved ", message.data);
    console.log("Incoming parameters", userEmail, contactToApprove);

    fetchContactsAndInvitations(userEmail, dispatch);
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

export const rejectContact = async (userEmail, emailToReject, dispatch) => {
  try {
    const msg = await axios.post(`user/${userEmail}/reject`, {
      data: {
        emailToReject,
      },
    });

    console.log("Contact rejected ", msg.data.message);

    const newInvitationsList = await axios.get(`user/${userEmail}/invitations`);

    dispatch({ type: UPDATE_INVITATIONS, payload: newInvitationsList });
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};
