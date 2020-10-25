import openSocket from 'socket.io-client';

const socket = openSocket("https://peppermint-chat-backend.herokuapp.com/");
export default socket;