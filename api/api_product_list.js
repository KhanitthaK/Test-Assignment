const express = require("express");
const router = express.Router();
const Sequelize = require("Sequelize");
const productlist = require("./../model/productlist");
const constance = require("./../constance/constance");
const sequelize = new Sequelize("e_commerce", "root", "sa@admin", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
});

router.post("/productlist/", async (req, res) => {
  try {
    let results = await productlist.create(req.body);
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/productlist/", async (req, res) => {
  try {
    let results = await sequelize.query(`
    SELECT * FROM e_commerce.productlists
    ORDER BY itemCode +0 ASC ;
    `);
    res.json({ results: results[0], api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/productlist/qty", async (req, res) => {
  try {
    const limits = req.query.limits;
    let results = await sequelize.query(`
    SELECT * FROM e_commerce.productlists
    ORDER BY itemCode +0 ASC 
    LIMIT ${limits};
    `);
    res.json({ results: results[0], api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/productlist/page", async (req, res) => {
  try {
    const limits = req.query.limits;
    const page = req.query.page;
    const offSet = (page - 1) * limits;
    let results = await sequelize.query(`
    SELECT * FROM e_commerce.productlists
    ORDER BY itemCode +0 ASC 
    LIMIT ${limits} OFFSET ${offSet} ;
    `);
    res.json({ results: results[0], api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});

module.exports = router;
