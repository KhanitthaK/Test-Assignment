//Reference
const { Sequelize, DataTypes } = require("sequelize");

const database = require("../instace/instace");

const paymentcheck = database.define(
  // table name
  "paymentcheck",
  {
    orderNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    payStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    payDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    confirmDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
  }
);

(async () => {
  await paymentcheck.sync({ force: false });
})();

module.exports = paymentcheck;
