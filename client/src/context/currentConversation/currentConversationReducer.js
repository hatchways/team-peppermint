import { ActionTypes } from "types";

const CurrentConversationReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_CONVERSATION: {
            return { ...state, ...action.payload }
        }
        case ActionTypes.SET_MESSAGES: {
            return { ...state, messages: action.payload }
        }
        case ActionTypes.PUSH_MESSAGE: {
            return { ...state, messages: [...state.messages, action.payload] }
        }
        default:
            return state;
    }
}
export default CurrentConversationReducer