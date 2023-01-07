const express = require("express");

const { BookingController } = require("../../controller/index.js");
// const { createChannel } = require("../../utils/messageQueue.js");

// const channel = await createChannel();
const bookingController = new BookingController();
const router = express.Router();

router.post("/bookings", bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;