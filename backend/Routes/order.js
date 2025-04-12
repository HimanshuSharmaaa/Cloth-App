const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Order = require("../Model/Order");

router.get("/", async (req, res) => {
    const resJson = await Order.findAll();
    return res.send('Run');
});

module.exports = router;