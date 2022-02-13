const router = require("express").Router();
const {
  getchatRoomsByuserId,
  AddChatRoom,
  createChat,
  getchatsByRoomId,
} = require("../controllers/chatRoom");

router.get("/getAllRooms/:id", getchatRoomsByuserId);
router.post("/addRoom", AddChatRoom);
router.get("/getAllChats/:id", getchatsByRoomId);
router.post("/SendMessage", createChat);

module.exports = router;
