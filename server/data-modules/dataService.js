const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = process.env.uri;
const UserSchema = require('../models/userSchema');
const Invitation = require("../models/invitationSchema");
var User, Invite;
module.exports = function(){
    
    return{
        connect: function(){ 
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(uri,{ useNewUrlParser: true, useUnifiedTopology: true }); 
                db.on('error', (err)=>{
                    reject(err);
                });
                db.once('open', ()=>{
                    console.log("connected to db");
                    User = db.model("users", UserSchema);
                    Invite = db.model("invitations", Invitation);
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
                let newInvite = new Invite(inviteObject);
                newInvite.save((err)=>{
                    if(err) reject(err);
                    else resolve("Invitation Created");
                })
            })
        },
        getInvitationsByEmail: function(userEmail) {
            return new Promise((resolve, reject)=>{
                Invite.find({
                    approved: false,
                    rejected: false,
                    to_user: userEmail
                }).exec()
                .then(invites=>resolve(invites))
                .catch(err=>reject(err));
            })
        }
    }
}

