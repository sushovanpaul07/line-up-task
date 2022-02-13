const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const chat = db.chat;

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

exports.createChat = async (data) => {
  const { roomId, userId, text, seen } = data;
  try {
    let newchat = await chat.create({
      id: uuidv4(),
      roomId: roomId,
      userId: userId,
      text: text,
      seen: seen,
    });
    return newchat;
  } catch (e) {
    console.log(e);
    return null;
  }
};
