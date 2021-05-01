const router = require("express").Router()
const passport = require('passport')
const UserControllers = require('../controllers/user.controllers')

router.post('/', UserControllers.postUser)
router.get('/', passport.authenticate('jwt', { session: false }), UserControllers.getUsersByEmailOrName)
router.get('/contacts', passport.authenticate('jwt', { session: false }), UserControllers.getContacts)
router.post('/contacts', passport.authenticate('jwt', { session: false }), UserControllers.addContact)
router.delete('/contacts/:contactUserID', passport.authenticate('jwt', { session: false }), UserControllers.deleteContact)
router.get('/conversations', passport.authenticate('jwt', { session: false }), UserControllers.getUserConversations)

module.exports = router