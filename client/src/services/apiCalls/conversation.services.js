import Axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
}

const ConversationServices = {
    sendMessage: (conversationID, message) => {
        return Axios(`/api/conversations/${conversationID}/message`, {
            method: 'POST',
            data: message,
            headers,
        })
    },
    fetchConversationById: (conversationID) => {
        return Axios.get(`/api/conversations/${conversationID}`)
    }
}
export default ConversationServices