const express = require('express');
const bookingController = require('../controller/bookingController');

const bookingRoutes = express.Router();

bookingRoutes.post('/bookings', bookingController.createBooking);
bookingRoutes.get('/bookings', bookingController.getAllBookings);
bookingRoutes.get('/bookings/:id', bookingController.getBookingById);
bookingRoutes.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = bookingRoutes;