const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = process.env.URI;
const UserSchema = require('../models/userSchema');
const ConversationSchema = require("../models/conversationSchema");
var User, Invitation, Conversation;
module.exports = function(){
    
    return{
        connect: function(){ 
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(uri,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); 
                db.on('error', (err)=>{
                    reject(err);
                });
                db.once('open', ()=>{
                    console.log("connected to db");
                    User = db.model("users", UserSchema);
                    Conversation = db.model("conversations", ConversationSchema);
                    resolve();
                });
            });
        },
        createUser: function(userObject){

            return new Promise((resolve,reject)=>{
                let newUser = new User(userObject);
                newUser.save((err) => {
                    if(err) reject(err);
                    else resolve(`new user: ${newUser.email} successfully added`);                    
                });
            });
        },
        getUserByEmail: function(userEmail){
            return new Promise((resolve,reject)=>{
                User.findOne({email: userEmail}).exec().then(user=>{
                    resolve(user)
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        deleteByEmail: function(userEmail){
            return new Promise((resolve,reject)=>{
                User.deleteOne({email: userEmail}).exec().then(()=>{
                    resolve(`user ${userEmail} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        updateUserFieldByEmail: function(userEmail, newData){
            return new Promise((resolve,reject)=>{
                User.updateOne({email: userEmail}, {
                    $set: newData
                }).exec().then(()=>{
                    resolve(`user ${userEmail} successfully updated`)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        getConversations: function(userEmail) {
            return new Promise((resolve, reject)=>{
                Conversation.find({usersEmail: {$in: userEmail}}).exec()
                .then(conversations => resolve(conversations))
                .catch(err=>reject(err))
            })
            
        },
        getContacts: function(userEmail){
            return new Promise((resolve, reject)=>{
                this.getUserByEmail(userEmail).then((user)=>{
                    resolve(user.contacts);
                }).catch((err)=> reject(err));
            });
        },
        addContact: function (currentEmail, emailToAdd) {
            let conversationID = [currentEmail, emailToAdd].sort().join()
            return new Promise((resolve, reject) => {
                User.updateOne({
                    email: currentEmail
                },
                    {
                        $push: {
                            contacts: {
                                email: emailToAdd,
                                status: 0,
                                conversationID: conversationID
                            }
                        }
                    }).exec()
                    .then(() => {
                        User.updateOne({
                            email: emailToAdd
                        },
                            {
                                $push: {
                                    contacts: {
                                        email: currentEmail,
                                        status: 1,
                                        conversationID: conversationID
                                    }
                                }
                            }).exec()
                            .then(() => resolve())
                            .catch((err) => reject(err))

                    })
                    .catch((err) => reject(err))
            })
        },
        respondToInvite: function (email, emailToAprove, status) {
            return new Promise((resolve, reject) => {
                User.updateOne({
                    email: email,
                    "contacts.email": emailToAprove
                },
                    {
                        $set: {
                            "contacts.$.status": status
                        }
                    }
                ).exec()
                .then(()=>resolve(`${emailToAprove}'s status changed`))
                .catch((err)=>reject(err))
            })
        },
        getContactsByStatus: function (email, status) {
            return new Promise((resolve, reject) => {
                this.getUserByEmail(email).then((user) => {
                    if (user.contacts.length > 0) {
                        resolve(user.contacts.find((contact) => contact.status === status))
                    } else {
                        resolve(user.contacts);
                    }
                }).catch((err) => reject(err));
            });
        }

    }
}

