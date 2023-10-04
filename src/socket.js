import socketIo from "socket.io-client";

const socket = socketIo.connect("http://localhost:5000");

export default socket;
