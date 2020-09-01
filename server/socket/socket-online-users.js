const onlineUsers = {};

const addOnlineUsers = (id, email) => {
  if (onlineUsers[email] === undefined) {
    onlineUsers[email] = [id];
  } else {
    if (!onlineUsers[email].includes(id)) {
      onlineUsers[email].push(id);
    }
  }
  return [email, true];
};

const removeOnlineUser = (id, email) => {
  if (onlineUsers[email] !== undefined) {
    if (onlineUsers[email].length === 1) {
      delete onlineUsers[email];
    } else {
      const index = onlineUsers[email].indexOf(id);
      index >= 0 && onlineUsers[email].splice(index, 1);
    }
  }
  return [email, false];
};
module.exports = { addOnlineUsers, removeOnlineUser, onlineUsers };
