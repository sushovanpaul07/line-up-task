const express = require("express");
const app = express();
const http = require("http");
var server = http.createServer(app);

const { createChat } = require("./controllers/chat");
const db = require("./models");
const dotenv = require("dotenv");
const cors = require("cors");
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

io.on("connection", (socket) => {
  socket.on("sendMessage", async (msg) => {
    console.log(msg, socket.id);
    const newText = await createChat({
      roomId: msg.room,
      userId: msg.userId,
      text: msg.message,
      seen: 0,
    });
    io.sockets.in(msg.room).emit("message", newText);
  });
  socket.on("joinRoom", (payload) => {
    console.log("socket", socket.id);
    console.log("payload==>", payload);
    console.log(socket.rooms);
    socket.join(payload.id);
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("server up at port ", PORT);
});
