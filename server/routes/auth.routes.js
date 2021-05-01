const router = require("express").Router()
const passport = require('passport')
const AuthControllers = require('../controllers/auth.controllers')

router.post('/login', passport.authenticate('local', { session: false }), AuthControllers.login)
router.get('/logout', passport.authenticate('jwt', { session: false }), AuthControllers.logout)
router.get('/authenticated', passport.authenticate('jwt', { session: false }), AuthControllers.authenticated)

module.exports = router