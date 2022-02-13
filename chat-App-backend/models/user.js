module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "chat_user",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      secretCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      verifyToken: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "chat_user",
      freezeTableName: true,
    }
  );
};
