import { ActionTypes } from "types";

const ConversationsReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CONVERSATIONS: {
            return { ...state, conversations: action.payload }
        }
        case ActionTypes.ADD_CONVERSATION: {
            return {...state, conversations: action.payload}
        }
        default:
            return state;
    }
}
export default ConversationsReducer