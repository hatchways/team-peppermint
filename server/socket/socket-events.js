const {
  addUser,
  removeUser,
} = require("./socket-helper");
const { addOnlineUsers, removeOnlineUser } = require("./socket-online-users");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("login", (email) => {
      socket.broadcast.emit("onlineUsers", addOnlineUsers(socket.id, email));
    });
    socket.on("join", ({ email, room }, callback) => {
      console.log(`${email} connected to ${room}`);
      const { error, connection } = addUser({ id: socket.id, email, room });
      if (error) return callback(error);
      socket.join(connection.room);
      callback();
    });

    socket.on("message", (message, room, callback) => {
      // const user = getUser(socket.id);
      io.to(room).emit("message", message);
      callback();
    });
    socket.on("disconnect", () => {

    });
    socket.on("logout", (email) => {
      removeUser(socket.id);
      socket.broadcast.emit("onlineUsers", removeOnlineUser(socket.id, email));
    });
  });

  return io;
};
