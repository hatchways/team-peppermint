import {
  FETCH_CONTACTS_INVITATIONS,
  UPDATE_INVITATIONS,
  UPDATE_CONTACTS,
  RESET_LISTS,
  ADD_UKNOWN_USER
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
    case UPDATE_CONTACTS: {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case ADD_UKNOWN_USER: {
      return {
        ...state,
        unknownUsers: action.payload,
      }
    }
    case RESET_LISTS: {
      return {
        contacts: [],
        invitations: [],
        unknownUsers: []
      };
    }

    default:
      return state;
  }
}
