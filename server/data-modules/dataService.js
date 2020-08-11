const { use } = require('chai');
const { reset } = require('nodemon');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = process.env.uri;
const dbName = "peppermint-db";
const userCollectionName = "users";
const client = MongoClient.connect(uri,{ useUnifiedTopology: true });

const userProjection = {
    "_id": 0,
    "email": "",
    "password": ""
}



module.exports = function(){
    var dbo;
    return{
        connectDB: function(){ 
            client.then((db)=>{
                console.log("Connected successfully to server");
                dbo = db.db(dbName);                
            }).catch((err)=>{console.error(err)});
        },
        createUser: function(userObject, callback){
            client.then(()=>{
                dbo.collection(userCollectionName).insertOne(userObject,
                    function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        callback(res);
                    }
                );
            }).catch((err)=>{console.error(err)});
        
        },
        getUserByEmail: function(userEmail, callback){
            client.then(()=>{
                dbo.collection(userCollectionName).findOne(
                    {"email":userEmail},
                    function(err,res){
                        if(err) throw err;
                        callback(res);
                    }
                );
            }).catch((err)=>{console.error(err)});
        },
        deleteByEmail: function(userEmail,callback){
            client.then(()=>{
                dbo.collection(userCollectionName).deleteOne(
                    {"email": userEmail},
                    function(err,res){
                        if(err) throw err;
                        callback(res);
                    }
                );
            }).catch((err)=>{console.error(err)});
        },
        updateUserFieldByEmail: function(userEmail, newUserData){
            client.then(()=>{
                dbo.collection(userCollectionName).updateOne(
                    {"email": userEmail},
                    {$set: newUserData},
                    function(err,res){
                        if(err) throw err;
                        callback(res);
                    }
                )
            }).catch((err)=>{console.error(err)});
        }
    }
}

