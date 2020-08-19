var connections=[];
module.exports = function(io){
    io.on('connection', (socket) => { 
        
        connections.push(socket);
        socket.on('login', ()=>{
          
        });
        socket.on('sendMsg', (message)=>{

        });
        socket.on('disconnect', ()=>{
            connections.splice(connections.indexOf(socket), 1);
            console.log(`disconnected`);
        })
    });


    return io;
}