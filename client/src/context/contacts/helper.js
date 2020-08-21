import {
  FETCH_CONTACTS_INVITATIONS,
  DELETE_CONTACT,
  APPROVE_INVITATION,
  REJECT_INVITATION,
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

  console.log("userEmail ", userEmail);

  if (!contacts.data) {
    throw Error("Sorry, failed to delete contact");
  }
  console.log("contact deleted ", contacts);
  dispatch({ type: DELETE_CONTACT, payload: { emailToDelete, index } });
};
