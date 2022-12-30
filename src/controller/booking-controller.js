const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index.js");

const bookingService = new BookingService();

const create = async (req, res) => {
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

module.exports = {
    create
}