const express = require("express");

const { BookingController } = require("../../controller/index.js");

const router = express.Router();

router.post("/bookings", BookingController.create);

module.exports = router;