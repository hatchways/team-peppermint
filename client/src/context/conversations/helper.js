import { FETCH_CONVERSATIONS, RESET_CONVERSATIONS } from "../../types";
import axios from "axios";

export const fetchConversations = async (email, dispatch) => {
    const conversationsRes = await axios.get(`/user/${email}/conversations`);
    if (!conversationsRes.data) {
        throw Error("Oops, no contacts found");
    }
    dispatch({
        type: FETCH_CONVERSATIONS,
        payload: {
            conversations: conversationsRes.data
        },
    });
};

export const resetConversations = (dispatch) => {
    dispatch({
        type: RESET_CONVERSATIONS,
    });
};
