import { FETCH_CONTACTS, DELETE_CONTACT } from "../../types";

export default function contactsReducer(state, action) {
  switch (action.type) {
    case FETCH_CONTACTS: {
      return { ...state, contacts: action.payload };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.splice(action.payload.index, 1),
      };
    }
    default:
      return state;
  }
}