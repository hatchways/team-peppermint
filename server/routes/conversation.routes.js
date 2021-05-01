const router = require("express").Router()
const passport = require('passport')
const ConversationControllers = require('../controllers/conversation.controllers')


router.post('/', passport.authenticate('jwt', { session: false }), ConversationControllers.postConversation)
router.post('/:conversationID/message', passport.authenticate('jwt', { session: false }), ConversationControllers.sendMessage)
router.get('/:conversationID', passport.authenticate('jwt', { session: false }), ConversationControllers.getConversationById)
//router.get('', passport.authenticate('jwt', { session: false }), ConversationControllers.getConversationsByEmail)

module.exports = router