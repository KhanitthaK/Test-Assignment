//Reference
const { Sequelize, DataTypes } = require("sequelize");

const database = require("../instace/instace");

const productlist = database.define(
  // table name
  "productlist",
  {
    itemCode: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    plainColor: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    pattern: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    figure: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
);

(async () => {
  await productlist.sync({ force: false });
})();

module.exports = productlist;



