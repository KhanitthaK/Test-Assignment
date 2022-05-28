const Sequelize = require("sequelize");

const sequelize = new Sequelize("e_commerce", "root", "sa@admin", {
  server: "localhost",
  dialect: "mysql",
});

(async () => {
  await sequelize.authenticate();
})();
module.exports = sequelize;



