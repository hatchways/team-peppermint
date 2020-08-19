const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        createUser:  function(userObject){

            return new Promise(async (resolve,reject)=>{
                try{
                    const salt = await bcrypt.genSalt(10);
                    userObject.password = await bcrypt.hash(userObject.password, salt);
                }catch(err){ reject(err)};
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
            return `${userEmail}: contacts`;
        },
        createConversation: function(conversationObject){
            return new Promise((resolve, reject)=>{
                let newConversation =new Conversation(conversationObject);
                newConversation.save((err)=>{
                    if(err) reject(err)
                    else resolve("New conversation created")
                })
            })
        }

    }
}

