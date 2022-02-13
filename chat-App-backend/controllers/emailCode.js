const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const codeGen = require("../utils/codeGenerator");
const emailCode = db.emailCode;
const user = db.user;
const { getUserById } = require("./user");
const { sendMail } = require("../utils/SendMail");
const jwt = require("jsonwebtoken");

exports.sendEmailCode = async (userId, redirectUrl) => {
  const currentUser = await getUserById(userId);
  console.log("currentUser ===>", currentUser);
  const randomCode = codeGen.makeCode();
  if (currentUser != null) {
    await emailCode.create({
      id: uuidv4(),
      userId: currentUser.id,
      email: currentUser.email,
      code: randomCode,
    });
  } else {
    return false;
  }
  const isSent = sendMail(
    "Verify Email",
    currentUser.email,
    randomCode,
    redirectUrl
  );
  if (!isSent) {
    console.log("email failed");
    return false;
  }
  return true;
};

exports.resendEmailCode = async (userId) => {
  const currentUser = await getUserById(userId);
  const randomCode = codeGen.makeCode();

  await emailCode.destroy({
    where: {
      userId: userId,
    },
  });
  if (currentUser != null) {
    await emailCode.create({
      id: uuidv4(),
      userId: currentUser.id,
      email: currentUser.email,
      code: randomCode,
    });
  } else {
    return;
  }
  const isSent = sendMail("Verify Email", currentUser.email, randomCode, "");
  if (!isSent) {
    console.log("email failed");
    return;
  }
  return true;
};

exports.verifyEmailCode = async (currentUser, code) => {
  if (currentUser != null) {
    const ifmatched = await emailCode
      .findOne({
        where: {
          userId: currentUser.id,
        },
      })
      .then(async (result) => {
        console.log("result===>", result);
        if (result.code == code) {
          await user
            .update(
              { verified: true },
              {
                where: {
                  id: currentUser.id,
                },
              }
            )
            .then((result) => {});
          return true;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    if (ifmatched) {
      return true;
    }
  } else {
    console.log("user not found");
    return false;
  }

  await this.resendEmailCode(userId);
};

exports.verifyEmailByToken = async (req, res) => {
  console.log(req.params.token);

  const currentUser = jwt.verify(
    req.params.token,
    "3yCDM96k1BG3T43Xis4HM0LxKa5vooxr"
  );
  console.log(currentUser);
  if (currentUser) {
    const ifmatched = await emailCode
      .findOne({
        where: {
          userId: currentUser.userId,
        },
      })
      .then(async (result) => {
        console.log("result===>", result);
        await user
          .update(
            { verified: true },
            {
              where: {
                id: currentUser.userId,
              },
            }
          )
          .then((result) => {});
        return true;
      })
      .catch((e) => {
        console.log(e);
      });

    if (ifmatched) {
      console.log("here at ifmatched");
      res.send({
        auth_token: req.params.token,
        message: "Success",
        id: currentUser.userId,
        email: currentUser.email,
      });
      return true;
    }
  } else {
    console.log("user not found");
    return false;
  }
};
