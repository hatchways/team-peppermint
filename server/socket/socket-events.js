
const { addUser, removeUser, getUser, getUsersInRoom } = require('./socket-helper');
const { remove } = require('../models/userSchema');
module.exports = function (io) {
    io.on('connection', (socket) => {

        socket.on('login', () => {

        });
        socket.on('join', ({ email, room }, callback) => {
            console.log(`${email} connected to ${room}`)
            const { error, connection } = addUser({ id: socket.id, email, room });
            if (error) return callback(error);
            socket.join(connection.room);
            callback();
        })

        socket.on('message', ({ message, time }, callback) => {
            const user = getUser(socket.id);
            io.to(user.room).emit('message', { user: user.email, text: message, time: time})
            callback();
        });
        socket.on('disconnect', () => {
            removeUser(socket.id)
            console.log(`disconnected`);
        })
    });


    return io;
}