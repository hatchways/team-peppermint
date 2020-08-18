const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = process.env.uri;


const UserSchema = require('../models/userSchema');
const InvitationSchema = require("../models/invitationSchema");
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
                    Invitation = db.model("invitations", InvitationSchema);
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
        createInvitation: function(inviteObject){
            return new Promise((resolve, reject)=>{
                let newInvite = new Invitation(inviteObject);
                newInvite.save((err)=>{
                    if(err) reject(err);
                    else resolve("Invitation Created");
                })
            })
        },
        getIncomingInvites: function(userEmail, accepted=false, canceled =false ) {
            return new Promise((resolve, reject)=>{
                Invitation.find({
                    approved: accepted,
                    rejected: canceled,
                    to_user: userEmail
                }).exec()
                .then(invites=>resolve(invites))
                .catch(err=>reject(err));
            })
        },
        getSentInvites: function(userEmail){
            return new Promise((resolve, reject)=>{
                Invitation.find({
                    from_user: userEmail
                }).exec()
                .then(invites=>resolve(invites))
                .catch(err=>reject(err));
            })   
        },
        getConversations: function(userEmail) {
            return new Promise((resolve, reject)=>{
                Conversation.find({usersEmail: {$in: userEmail}}).exec()
                .then(conversations => resolve(conversations))
                .catch(err=>reject(err))
            })
            
        },
        getContacts: function(userEmail){
            return `${userEmail}: contacts`;
        }

    }
}

