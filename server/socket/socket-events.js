const { addUser, removeUser, getUser, getUsersInRoom } = require('./socket-helper');
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('login', () => { });
        socket.on('join', ({ email, room }, callback) => {
            console.log(`${email} connected to ${room}`)
            const { error, connection } = addUser({ id: socket.id, email, room });
            if (error) return callback(error);
            socket.join(connection.room);
            callback();
        })

        socket.on('message', (message, callback) => {
            const user = getUser(socket.id);
            io.to(user.room).emit('message', message)
            callback();
        });
        socket.on('disconnect', () => {
            removeUser(socket.id)
            console.log(`disconnected`);
        })
    });


    return io;
}