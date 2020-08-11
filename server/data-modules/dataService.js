const { use } = require('chai');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.uri;
const client = (callBack)=> MongoClient.connect(uri,{ useUnifiedTopology: true }, callBack);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6
  }
})
module.exports = function(){
    return{
        testConnection: function(){ 
            client(
                function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("peppermint-db");
                    dbo.collection("users").find({}, userSchema)
                    .toArray()
                    .then(users=>{   
                        console.log(users)
                        db.close();
                    })
                    .catch(err=>console.error(`failed to find documents: ${err}`))
                }
            )
            
        },
        signUpUser: function(userObject){
            client(
                function(err, db){
                    if (err) throw err;
                    var dbo = db.db("peppermint-db");
                    dbo.collection("users").insertOne(userObject)
                    .then(result=> console.log(`Successfully added user: ${result.insertedId}`))
                    .catch(err=> console.error(`Failed to add user: ${err}`))
                }
            )
        }
    }
}

