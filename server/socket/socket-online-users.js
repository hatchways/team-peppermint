const User = require("../models/UserModel");

const onlineUsers = {};

const addOnlineUsers = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: true }, (err) => {
    if (err) console.log(err)
  })
  if (onlineUsers[userID] === undefined) {
    onlineUsers[userID] = [socketID];
    return;
  }
  if (!onlineUsers[userID].includes(socketID)) {
    onlineUsers[userID].push(socketID);
    return;
  }
}

const removeOnlineUser = (socketID, userID) => {
  User.findOneAndUpdate({ _id: userID }, { isOnline: false }, (err) => {
    if (err) console.log(err)
  })
  if (onlineUsers[userID] === undefined) return;
  if (onlineUsers[userID].length === 1) {
    delete onlineUsers[userID];
    return;
  }
  const index = onlineUsers[userID].indexOf(socketID);
  index >= 0 && onlineUsers[userID].splice(index, 1);
}
module.exports = { addOnlineUsers, removeOnlineUser, onlineUsers };
