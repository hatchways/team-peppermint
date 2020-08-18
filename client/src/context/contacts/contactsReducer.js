import { FETCH_CONTACTS, DELETE_CONTACT } from "../../types";

export default function contactsReducer(state, action) {
  switch (action.type) {
    case FETCH_CONTACTS: {
      return { ...state, contacts: action.payload };
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
