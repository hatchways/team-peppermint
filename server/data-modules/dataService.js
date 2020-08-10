const MongoClient = require('mongodb').MongoClient;
const uri = process.env.uri;
const client = (callBack)=> MongoClient.connect(uri,{ useUnifiedTopology: true }, callBack);

module.exports = function(){
    return{
        testConnection: function(){ 
            client(
                function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("peppermint-db");
                    dbo.collection("users").findOne({}, function(err, result) {
                        if (err) throw err;
                        console.log(result.email);
                        db.close();
                    })
                }
            )
            
        },
        signUpUser: function(userObject){
            client(
                function(err, db){
                    if (err) throw err;
                    var dbo = db.db("peppermint-db");
                    dbo.collection("users").insertOne(userObject, function(err, result){
                        if(err) throw err;
                        console.log("user added");
                        db.close();
                    })
                }
            )
        },
        getUserById: function(id){
            MongoClient.connect(uri, function(err, db){
                if (err) throw err;
                var dbo = db.db("peppermint-db");
                dbo.collection("users").insertOne(userObject, function(err, result){
                    if(err) throw err;
                    console.log("user added");
                    db.close();
                })
            })
        }
    }
}

