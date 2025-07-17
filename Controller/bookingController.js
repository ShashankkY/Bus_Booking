// controllers/bookingController.js
const { Booking, User, Bus } = require('../models/associations');

const bookingController = {
  // Create a new booking
  async createBooking(req, res) {
    try {
      const { userId, busId, seatNumber } = req.body;
      
      if (!userId || !busId || !seatNumber) {
        return res.status(400).json({ error: 'User ID, Bus ID, and seat number are required' });
      }

      // Check if user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if bus exists
      const bus = await Bus.findByPk(busId);
      if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
      }

      // Check if seat is already booked
      const existingBooking = await Booking.findOne({
        where: { busId, seatNumber }
      });
      if (existingBooking) {
        return res.status(400).json({ error: 'Seat is already booked' });
      }

      // Check if bus has available seats
      if (bus.availableSeats <= 0) {
        return res.status(400).json({ error: 'No available seats on this bus' });
      }

      // Create the booking
      const booking = await Booking.create({ userId, busId, seatNumber });

      // Update available seats
      await bus.update({ availableSeats: bus.availableSeats - 1 });

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all bookings
  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: [
          {
            model: User,
            attributes: ['name', 'email']
          },
          {
            model: Bus,
            attributes: ['busNumber', 'totalSeats', 'availableSeats']
          }
        ]
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get booking by ID
  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['name', 'email']
          },
          {
            model: Bus,
            attributes: ['busNumber', 'totalSeats', 'availableSeats']
          }
        ]
      });
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a booking
  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Get the bus to update available seats
      const bus = await Bus.findByPk(booking.busId);
      if (bus) {
        await bus.update({ availableSeats: bus.availableSeats + 1 });
      }

      await booking.destroy();
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookingController;