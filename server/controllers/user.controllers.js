const User = require('../models/UserModel')
const Conversation = require('../models/ConversationModel')
const { findUserByEmail, createUser, updateUserById, findUsersByEmailOrName, findUserById } = require('../services/user.services')
const { BadRequest, NotFound } = require('../utilities/errors')
const { query } = require('express')
const { generateConversation } = require('../helpers/conversation.helpers')
const { findConversationById, findConversationByConversationIdAndTitle, createConversation } = require('../services/conversation.services')
const postUser = async (req, res, next) => {
    try {
        const userData = req.body
        const { name, email, password, language, referrer } = userData
        const user = await findUserByEmail(email)
        if (user) throw new BadRequest('User already exists')
        await createUser(userData)
        res.status(204).json()
    }
    catch (err) { next(err) }
}
const getContacts = (req, res, next) => {
    const { _id } = req.user
    User.findById(_id)
        .populate({
            path: 'contacts',
            select: 'name email pictureURL language isOnline'
        })
        .exec((err, user) => {
            try {
                if (err) throw new Error(err)
                return res.status(201).json({ message: "Contacts found", contacts: user.contacts })
            }
            catch (err) { return next(err) }
        })
}

const deleteContact = async (req, res, next) => {
    try {
        const { _id } = req.user
        const contactUserID = req.params.userID
        const query = { $pull: { contacts: contactUserID } }
        await updateUserById(_id, query)
    }
    catch (err) { next(err) }
    // User.updateOne({ id: _id }, {
    //     $pull: { contacts: contactUserID }
    // }, err => {
    //     try {
    //         if (err) throw new Error(err)
    //         return res.status(201).json({ message: "Contact Deleted", error: false })
    //     }
    //     catch (err) { return next(err) }
    // })
}
const updateProfileImage = (req, res, next) => {

}
const getUsersByEmailOrName = async (req, res, next) => {
    try {
        const { _id, contacts } = req.user
        const searchQuery = req.query.searchTerm
        const users = await findUsersByEmailOrName(searchQuery)
        const outputUsers = contacts.length > 0 ? users.filter(function (el) { return this.indexOf(el._id) < 0 || el._id === _id }, contacts) : users
        res.status(201).json({ message: 'Users', users: outputUsers })
    }
    catch (err) { next(err) }
}


const addContact = async (req, res, next) => {
    try {
        const { _id } = req.user
        const contactID = req.body.contactID

        let contact = await findUserById(contactID)
        if (!contact) throw new NotFound()

        const generatedConversation = generateConversation([_id, contact._id])
        const conversation = await findConversationByConversationIdAndTitle(generatedConversation.conversationID, generatedConversation.title)
        let newConversation
        if (!conversation) newConversation = await createConversation([_id, contact._id])

        const query = { $addToSet: { contacts: contact._id } }
        await updateUserById(_id, query)
        return res.status(200).json({ message: "Contact Added", newContact: contact, newConversation })

    }
    catch (err) { next(err) }
}
const getUserConversations = (req, res, next) => {
    const { _id } = req.user
    User.findById(_id)
        .populate({
            path: 'conversations',
            select: '_id conversationID conversationTitle users lastMessage',
            populate: {
                path: 'users',
                select: '_id name pictureURL language isOnline'
            }
        })
        .exec((err, user) => {
            try {
                if (err)
                    throw new Error(err)
                if (user && user.conversations.length > 0)
                    return res.status(200).json({ message: "Conversations Found", error: false, conversations: user.conversations })
                else
                    return res.status(404).json({ message: "Conversations not found", error: false })
            }
            catch (err) { return next(err) }
        })
}
module.exports = {
    postUser, getContacts, deleteContact, addContact, getUserConversations, getUsersByEmailOrName
}