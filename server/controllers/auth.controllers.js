const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const signToken = userId => {
    return jwt.sign({
        iss: process.env.JWT_SECRET,
        sub: userId
    }, process.env.JWT_SECRET, { expiresIn: "1h" })
}
const login = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            const { _id, email, name, language, pictureURL } = req.user
            const token = signToken(_id)
            res.cookie('access_token', token, { httpOnly: true, sameSite: true })
            return res.status(200).json({ isAuthenticated: true, user: { _id, email, name, language, pictureURL } })
        }
        else {
            return res.status(401).json({ isAuthenticated: false, user: { _id: '', email: '', name: '', language: '', pictureURL: '' } })
        }
    }
    catch (err) { console.log(err) }
}
const logout = (req, res) => {
    res.clearCookie('access_token')
    return res.json({ user: { _id: '', email: '', name: '', language: '', pictureURL: '' }, success: true })
}
const authenticated = (req, res) => {
    const { _id, email, name, language, pictureURL } = req.user
    return res.status(200).json({ isAuthenticated: true, user: { _id, email, name, language, pictureURL } })
}
module.exports = {
    login, logout, authenticated
}