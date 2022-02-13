const config = require("../configs/db.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.uri);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.chat = require("./chat")(sequelize, Sequelize);
db.chatRoom = require("./chatRoom")(sequelize, Sequelize);
db.emailCode = require("./emailCode")(sequelize, Sequelize);

db.chat.belongsTo(db.user, { foreignKey: "userId", targetKey: "id" });

db.user.hasMany(db.chat, { foreignKey: "id" });

module.exports = db;
