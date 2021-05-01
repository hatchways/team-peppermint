const User = require("../models/UserModel")
const { Conversation } = require("../models/ConversationModel")
const { GeneralError, BadRequest, NotFound } = require('../utilities/errors')
const { generateConversation } = require("../helpers/conversation.helpers")

const findConversationById = (id) => {
    return new Promise((resolve, reject) => {
        Conversation.findById(id)
            .exec((err, conversation) => {
                if (err) reject(new Error(err))
                if (!conversation) reject(new NotFound())
                resolve(conversation)
            })
    })
}
const findConversationByConversationIdAndTitle = (conversationID, conversationTitle) => {
    return new Promise((resolve, reject) => {
        Conversation.findOne({ conversationID, conversationTitle })
            .exec((err, conversation) => {
                if (err) reject(new Error(err))
                resolve(conversation)
            })
    })
}
const createConversation = (users, title) => {
    return new Promise((resolve, reject) => {
        if (users.length < 2) reject(new BadRequest("2 or more users required"))
        const conversation = generateConversation(users, title)
        const newConversation = new Conversation(conversation)
        newConversation.save((err) => {
            if (err) reject(err)
            User.updateMany({ _id: { $in: users } }, { $addToSet: { conversations: newConversation._id } },
                err => {
                    if (err) reject(new Error(err))
                    resolve(newConversation)
                })

        })
    })
}
const pushMessageToConversation = (conversationID, message) => {
    return new Promise((resolve, reject) => {
        Conversation.findOneAndUpdate({ _id: conversationID }, {
            $push: { messages: message },
            lastMessage: message
        }, { new: true }, (err, updatedConversation) => {
            if (err) reject(new Error(err))
            resolve(updatedConversation)
        })
    })
}
module.exports = {
    findConversationById,
    findConversationByConversationIdAndTitle,
    createConversation,
    pushMessageToConversation,
}