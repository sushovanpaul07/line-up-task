const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const user = db.user;

exports.getUserById = async (id) => {
  console.log(id);
  if (id != "") {
    let reqUser = await user
      .findOne({
        where: {
          id: id,
        },
      })
      .then((thisUser) => {
        console.log("thisUser", thisUser);
        return thisUser;
      })
      .catch((e) => {
        console.log("error while finding user by id ", e);
        return null;
      });
    return reqUser;
  }
  return null;
};

exports.getUserByusername = async (username) => {
  if (id != "") {
    let reqUser = await user
      .findOne({
        where: {
          username: username,
        },
      })
      .then((thisUser) => {
        return thisUser;
      })
      .catch((e) => {
        return e;
      });
    return reqUser;
  }
  return null;
};

exports.createUser = async (data) => {
  const { username, secretCode } = data;
  try {
    let newUser = await user.create({
      id: uuidv4(),
      username: username,
      secretCode: secretCode,
      status: 0,
    });
    return newUser;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.editUser = async (data) => {
  const { id, username, secretCode } = data;
  try {
    let newUser = await user.update(
      {
        username: username,
        secretCode: secretCode,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return newUser;
  } catch (e) {
    console.log(e);
    return null;
  }
};
