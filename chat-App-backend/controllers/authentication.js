const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const user = db.user;
const saltRounds = 10;

dotenv.config();

exports.register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  var hashedPassword;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      await user
        .create({
          id: uuidv4(),
          username: username,
          email: email,
          status: 0,
          secretCode: "!",
          password: hash,
          verified: false,
          verifyToken: "!",
        })
        .then(async (user) => {
          const token = jwt.sign(
            {
              username: username,
              userId: user.dataValues.id,
              isVerified: user.verified,
              email: email,
            },
            "3yCDM96k1BG3T43Xis4HM0LxKa5vooxr"
          );
          res.status(200).send({
            auth_token: token,
            message: "Success",
            id: user.dataValues.id,
          });
        })
        .catch((e) => {
          console.log("error while creating new user", e);
          res.status(400).send({
            message: "failed",
            error: e,
          });
        });
    });
  });
};

exports.signIn = async (req, res) => {
  const { username, email, password } = req.body;
  var query;
  if (username) {
    query = {
      username: username,
    };
  } else if (email) {
    query = {
      email: email,
    };
  }
  await user
    .findOne({
      where: query,
    })
    .then((user) => {
      const isTrue = bcrypt.compareSync(password, user.password);
      if (isTrue) {
        const token = jwt.sign(
          {
            username: username,
            userId: user.dataValues.id,
            isVerified: user.verified,
            email: email,
          },
          "3yCDM96k1BG3T43Xis4HM0LxKa5vooxr"
        );
        res.status(200).send({
          auth_token: token,
          message: "Success",
          id: user.dataValues.id,
        });
      } else {
        console.log("wrong password");
        res.status(400).send({
          message: "authentication failed",
        });
      }
    });
};
