import io from "socket.io-client";

export const Socket = io(`https://line-up-sp07.herokuapp.com`);

export const initSocket = () => {
  Socket.emit("joinRoom", { room: "onlyRoom" });
  return () => Socket.close();
};

export const sendText = (data) => {
  Socket.emit("sendMessage", data);
};

export const joinRoom = (data) => {
  Socket.emit("joinRoom", data);
};
