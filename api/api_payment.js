const express = require("express");
const router = express.Router();
const Sequelize = require("Sequelize");
const payment = require("../model/payment");
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

//PAYMENT
router.post("/payment/", async (req, res) => {
  try {
    let results = await payment.create(req.body);
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/payment/", async (req, res) => {
  try {
    let results = await payment.findAll({});
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/payment/status", async (req, res) => {
  try {
    const { payStatus } = req.body;
    let results = await payment.findAll({ where: { payStatus } });
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/payment/paydate", async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let results = await sequelize.query(`
    SELECT * FROM e_commerce.paymentchecks
    WHERE payDate BETWEEN '${startDate}' AND '${endDate}';
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
router.get("/payment/qty", async (req, res) => {
  try {
    const limits = req.query.limits;
    let results = await sequelize.query(`
    WITH P AS (SELECT * FROM e_commerce.paymentchecks
    WHERE payStatus = 'confirm')
    SELECT * FROM P
    ORDER BY payDate ASC
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
router.get("/payment/page", async (req, res) => {
  try {
    const limits = req.query.limits;
    const page = req.query.page;
    const offSet = (page - 1) * limits;
    let results = await sequelize.query(`
    WITH P AS (SELECT * FROM e_commerce.paymentchecks
    WHERE payStatus = 'confirm')
    SELECT * FROM P
    ORDER BY payDate ASC
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
