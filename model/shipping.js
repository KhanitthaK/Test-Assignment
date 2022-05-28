//Reference
const { Sequelize, DataTypes } = require("sequelize");

const database = require("../instace/instace");

const shipaddress = database.define(
  // table name
  "shipaddress",
  {
    orderNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    shipAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shipProvince: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shipDistrict: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shipPostal: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }
);

(async () => {
  await shipaddress.sync({ force: false });
})();

module.exports = shipaddress;
