import socketIOClient from "socket.io-client";
import axios from "axios";

const endpoint = window.location.hostname + ":" + window.location.port;

export const socket = socketIOClient(endpoint);

socket.on("connect", async () => {
  await axios.post("/api/initsocket", { socketid: socket.id });
});
