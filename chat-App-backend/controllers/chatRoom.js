const db = require("../models");
const { Op } = require("sequelize");
const { getUserById } = require("./user");
const { v4: uuidv4 } = require("uuid");
const { QueryTypes } = require("sequelize");
const config = require("../configs/db.js");

const chatRoom = db.chatRoom;
const user = db.user;
const chat = db.chat;

exports.getchatRoomsByuserId = async (req, res) => {
  const { id } = req.params;
  if (id != "") {
    let reqchatRoom = await db.sequelize
      .query("SELECT * FROM chatroom WHERE :user_id = any(users)", {
        replacements: { user_id: id },
        type: QueryTypes.SELECT,
      })
      .then((thischatRoom) => {
        console.log("thischatRoom", thischatRoom);
        return thischatRoom;
      })
      .catch((e) => {
        return e;
      });
    res.send(reqchatRoom);
    return;
  }
  res.send("Room not found");
};

exports.AddChatRoom = async (req, res) => {
  const { userId, muted, read, color, email } = req.body;

  const getUser = await user.findOne({
    where: {
      email: email,
    },
  });
  let users = [userId, getUser.id];

  userName = [];
  for (var i of users) {
    const currUser = await getUserById(i);
    console.log(currUser.username);
    userName.push(currUser.username);
  }
  try {
    let newchatRoom = await chatRoom.create({
      id: uuidv4(),
      users: users,
      names: userName,
      muted: 1,
      read: 1,
      color: "",
    });
    res.send(newchatRoom);
  } catch (e) {
    console.log(e);
    res.send("server error");
  }
};

exports.getchatsByRoomId = async (req, res) => {
  const { id } = req.params;
  if (id != "") {
    let reqchat = await chat
      .findAll({
        where: {
          roomId: id,
        },
        order: [["createdAt", "DESC"]],
        limit: 20,
      })
      .then((thischat) => {
        console.log("thischat", thischat);
        return thischat;
      })
      .catch((e) => {
        return e;
      });
    res.send(reqchat.reverse());
    return;
  }
  res.send("not found");
  return null;
};

exports.createChat = async (req, res) => {
  const { roomId, userId, text } = req.body;
  try {
    let newchat = await chat.create({
      id: uuidv4(),
      roomId: roomId,
      userId: userId,
      text: text,
      seen: 1,
    });
    res.send(newchat);
  } catch (e) {
    console.log(e);
    res.send("server error");
  }
};
