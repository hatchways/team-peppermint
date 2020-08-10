const express = require("express");
const router = express.Router();
const dataService = require('../data-modules/dataService');
const data = dataService();

router.get("/welcome", function (req, res, next) {
  data.testConnection();
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});


module.exports = router;
