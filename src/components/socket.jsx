import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/mediasoup`); // Replace with your server URL

export default socket;