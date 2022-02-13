const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "chatroom",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      names: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      muted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      read: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: -1,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "chatroom",
    }
  );
};
