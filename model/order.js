//Reference
const { Sequelize, DataTypes } = require("sequelize");

const database = require("../instace/instace");

const orderlist = database.define(
  // table name
  "orderlist",
  {
    orderNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    orderDate: {
       type: Sequelize.DATEONLY,
       allowNull: false,
    },
    itemCode: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    qtyItem: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
);

(async () => {
  await orderlist.sync({ force: false });
})();

module.exports = orderlist;



