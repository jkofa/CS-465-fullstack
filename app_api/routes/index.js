// app_api/routes/index.js
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/trips", require("./trips"));

module.exports = router;