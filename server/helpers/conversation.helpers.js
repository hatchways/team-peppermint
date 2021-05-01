const stringHash = require('string-hash')
const generateConversation = (users, title = null) => {
    const conversationID = stringHash(users.sort().join())
    const conversation = {
        conversationID,
        conversationTitle: title || null,
        users,
    }
    return conversation
}
module.exports = {
    generateConversation
}