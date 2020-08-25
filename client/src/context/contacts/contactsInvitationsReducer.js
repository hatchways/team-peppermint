import {
  FETCH_CONTACTS_INVITATIONS,
  UPDATE_INVITATIONS,
} from "../../types";

export default function contactsInvitaitionsReducer(state, action) {
  switch (action.type) {
    case FETCH_CONTACTS_INVITATIONS: {
      return {
        ...state,
        contacts: action.payload.contacts,
        invitations: action.payload.invitations,
      };
    }    
    case UPDATE_INVITATIONS: {
      return {
        ...state,
        invitations: action.payload,
      };
    }
    default:
      return state;
  }
}
