module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "email_code",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "email_code",
      freezeTableName: true,
    }
  );
};
