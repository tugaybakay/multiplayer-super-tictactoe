import { io } from "socket.io-client";

const socket = io("127.0.0.1:3000", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts (in ms)
  reconnectionDelayMax: 5000, // Maximum delay for reconnection attempts
  randomizationFactor: 0.5 // Randomization factor for reconnection attempts
});

export default socket;