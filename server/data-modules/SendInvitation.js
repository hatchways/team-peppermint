const sgMail = require('@sendgrid/mail');


var sendInvite = function(reciever){
    let msg ={
        to: reciever,
        from: "hws.peppermint@gmail.com",
        subject: 'Join to the app',
        text: 'Chat with people from different contries'
    }
    return new Promise((resolve, reject)=>{
        sgMail.send(msg)
        .then(()=>{
            resolve("invitation sent");
        })
        .catch((err)=>reject(err));
    })

    
}
module.exports.sendInvite = sendInvite;