const User = require("../models/UserModel")
const { NotFound } = require("../utilities/errors")

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, 'name email language pictureURL isOnline')
            .exec((err, user) => {
                if (err) reject(err)
                resolve(user)
            })
    })
}
const findUserByEmail = (userEmail) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: userEmail }, (err, user) => {
            if (err) reject(new Error(err))
            resolve(user)
        })
    })
}
const findUsersByEmailOrName = (query) => {
    const regexQuery = new RegExp(query, 'i')
    return new Promise((resolve, reject) => {
        User.find({ $or: [{ email: regexQuery }, { name: regexQuery }] }, 'email name language pictureURL isOnline')
            .exec((err, users) => {
                if (err) reject(new Error(err))
                resolve(users)
            })
    })
}
const createUser = ({ name, email, password, language }) => {
    return new Promise((resolve, reject) => {
        const prefLanguage = language || "english";
        const newUser = new User({ name, email, password, language: prefLanguage })
        newUser.save(err => {
            if (err) reject(new Error(err))
            resolve()
        })
    })
}
const updateUserById = (id, query) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate({ _id: id }, query, { new: true }, (err, user) => {
            if (err) reject(new Error(err))
            resolve(user)
        })
    })
}

module.exports = {
    findUserById,
    findUserByEmail,
    findUsersByEmailOrName,
    createUser,
    updateUserById
}