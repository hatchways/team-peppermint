import { FETCH_CONTACTS_INVITATIONS, DELETE_CONTACT } from "../../types";

export default function contactsInvitaitionsReducer(state, action) {
  switch (action.type) {
    case FETCH_CONTACTS_INVITATIONS: {
      return {
        ...state,
        contacts: action.payload.contacts,
        invitations: action.payload.invitations,
      };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts
          .slice(0, action.payload.index)
          .concat(state.contacts.slice(action.payload.index + 1)),
      };
    }
    default:
      return state;
  }
}
