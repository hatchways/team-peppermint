const {
  addUser,
  removeUser,
} = require("./socket-helper");
const { addOnlineUsers, removeOnlineUser, onlineUsers } = require("./socket-online-users");

module.exports = function (io) {
  io.on("connection", (socket) => {
    const userID = socket.handshake.query.userID
    addOnlineUsers(socket.id, userID)
    io.emit(`${userID}-login`, { isOnline: true })
    socket.on('new-message', messageData => {
      console.log(messageData)
      io.emit(`${messageData.conversationID}-message`, messageData)
    })
    socket.on("disconnect", () => {
      io.emit(`${userID}-logout`, { isOnline: false })
      removeOnlineUser(socket.id, userID)
      io.emit()
    })

  });



  return io;
};
