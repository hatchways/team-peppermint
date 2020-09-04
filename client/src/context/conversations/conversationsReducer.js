import { FETCH_CONVERSATIONS, RESET_CONVERSATIONS } from "../../types";

export default function conversationsReducer(state, action) {
    switch (action.type) {
        case FETCH_CONVERSATIONS: {
            return {
                conversations: action.payload.conversations,
            };
        }
        case RESET_CONVERSATIONS: {
            return {
                conversations: []
            }
        }
        default:
            return state;
    }
}
