const { Conversation, MessageSchema } = require('../models/ConversationModel')
const { findConversationById, createConversation, pushMessageToConversation } = require('../services/conversation.services')

const getConversationsByUserId = (req, res, next) => {
    const id = req.query.userID
    Conversation.find({ users: id }, (err, conversations) => {
        if (err) next(err)
        if (!conversations) next(err)
        return res.status(200).json({ message: "Conversations found", error: false, conversations })
    })
}

const getConversationById = async (req, res, next) => {
    try {
        const conversationID = req.params.conversationID
        let conversation = await findConversationById(conversationID)
        res.status(200).json({ message: 'Conversation Found', conversation })
    }
    catch (err) { next(err) }
}
const postConversation = async (req, res, next) => {
    try {
        const { users, title } = req.body
        await createConversation(users, title)
        res.status(204).json()
    }
    catch (err) { next(err) }
}
const sendMessage = async (req, res, next) => {
    try {
        const conversationID = req.params.conversationID
        const messageBody = req.body
        const messageToSave = {
            sender: req.user._id,
            ...messageBody
        }
        let updatedConversation = await pushMessageToConversation(conversationID, messageToSave)
        res.status(200).json({ message: "Message Sent", messageObject: updatedConversation.lastMessage })
    }
    catch (err) { next(err) }
}
module.exports = {
    getConversationsByUserId,
    getConversationById,
    postConversation,
    sendMessage
}