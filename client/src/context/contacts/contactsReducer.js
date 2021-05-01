import { ActionTypes } from "types";

const ContactsReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CONTACTS: {
            return { ...state, contacts: action.payload }
        }
        case ActionTypes.ADD_CONTACT: {
            return { ...state, contacts: [...state.contacts, action.payload] }
        }
        case ActionTypes.UPDATE_CONTACT_STATUS: {
            let idx = state.contacts.indexOf(action.payload.contact)
            state.contacts[idx].isOnline = action.payload.status

            return { ...state }
        }
        default:
            return state;
    }
}
export default ContactsReducer