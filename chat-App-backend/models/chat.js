module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "chat",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      roomId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
    },
    {
      tableName: "chat",
    }
  );
};
