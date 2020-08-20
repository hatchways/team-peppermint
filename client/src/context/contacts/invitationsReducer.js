import { FETCH_INVITATIONS, APPROVE_INVITATION, REJECT_INVITATION } from "../../types";

export default function contactsReducer(state, action) {
  switch (action.type) {
    case FETCH_INVITATIONS: {
      return { ...state, invitations: action.payload };
    }    
    default:
      return state;
  }
}
