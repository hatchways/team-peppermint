var connections=[];
const { addUser, removeUser, getUser, getUsersInRoom} =require('./socket-helper');
module.exports = function(io){
    io.on('connection', (socket) => { 

        connections.push(socket);
        socket.on('login', ()=>{
          
        });
        socket.on('join', ({name, room}, callback)=>{
            console.log(name, socket.id, room)
            const { error, user} = addUser({id: socket.id, name, room});
            if(error) return callback(error);
            socket.join(user.room);
            callback();
        })

        socket.on('message', (message, time, callback)=>{ 
            console.log(message);
            const user = getUser(socket.id);
            io.to(user.room).emit('message', {user: user.name, text: message, time: time});
            callback();
        });
        socket.on('disconnect', ()=>{
            connections.splice(connections.indexOf(socket), 1);
            console.log(`disconnected`);
        })
    });


    return io;
}