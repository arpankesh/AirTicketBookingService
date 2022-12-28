const { StatusCodes } = require('http-status-codes');
const { Booking } = require("../models/index.js");
const { ValidationError, AppError } = require("../utils/errors/index.js");

class BookingRepository {

    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == "SequelizeValidationErro") {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async update(data) {

    }

}

module.exports = BookingRepository;