const express = require("express");
const router = express.Router();
const orderlist = require("./../model/order");
const shipping = require("./../model/shipping");
const constance = require("./../constance/constance");

//ORDER
router.post("/ordertlist/", async (req, res) => {
  try {
    let results = await orderlist.create(req.body);
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/ordertlist/", async (req, res) => {
  try {
    let results = await orderlist.findAll({});
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});

//SHIPPING
router.post("/shipping/", async (req, res) => {
  try {
    let results = await shipping.create(req.body);
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});
router.get("/shipping/", async (req, res) => {
  try {
    let results = await shipping.findAll({});
    res.json({ results: results, api_results: constance.results_ok });
  } catch (error) {
    console.error(error);
    res.json({
      results: error.parent.sqlMessage,
      api_results: constance.results_nok,
    });
  }
});

module.exports = router;
