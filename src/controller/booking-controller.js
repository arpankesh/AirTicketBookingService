const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index.js");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig.js")

const bookingService = new BookingService();

class BookingController {

    constructor() {
    }

    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: "This is a notification from a queue",
                content: "Some service will subscribe to this queue",
                recepientEmail: "airlinemanagementsanket@gmail.com",
                notificationTime: "2023-01-08T20:50:00.000"
            },
            service: "CREATE_TICKET"
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message: "Suucessfully published the event"
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONROLLER", response);
            return res.status(StatusCodes.OK).json({
                message: "Successfully created the booking",
                data: response,
                err: {},
                success: true
            })
        } catch (error) {
            console.log("FROM BOOKING CONROLLER ERROR HANDLING ", error);
            return res.status(error.statusCode).json({
                message: error.message,
                data: {},
                err: error.explanation,
                success: false
            })
        }
    }

}

module.exports = BookingController;