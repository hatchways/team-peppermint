const { connect } = require("mongoose");
const connections = [];
const addUser = ({ id, email, room }) => {
  const index = connections.findIndex((connection) => connection.id === id);
  if (index !== -1) {
    connections[index].room = room;
    return { connection: connections[index] }
  }
  const connection = { id, email, room };
  connections.push(connection);

  return { connection };
}
const removeUser = (id) => {
  const index = connections.findIndex((connection) => connection.id === id);
  if (index !== -1) return connections.splice(index, 1)[0];
}
const getUser = (id) => connections.find((connection) => connection.id === id);
const getUsersInRoom = (room) => connections.filter((connection) => connection.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };