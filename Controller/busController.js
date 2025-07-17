const { Bus, Booking, User } = require('../models/associations');

const busController = {
  // Create a new bus
  async createBus(req, res) {
    try {
      const { busNumber, totalSeats, availableSeats } = req.body;
      
      if (!busNumber || !totalSeats || availableSeats === undefined) {
        return res.status(400).json({ error: 'Bus number, total seats, and available seats are required' });
      }

      const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
      res.status(201).json(bus);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Bus number already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  // Get all buses
  async getAllBuses(req, res) {
    try {
      const buses = await Bus.findAll();
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get bus by ID
  async getBusById(req, res) {
    try {
      const { id } = req.params;
      const bus = await Bus.findByPk(id);
      
      if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
      }
      
      res.json(bus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all bookings for a specific bus with user details
  async getBusBookings(req, res) {
    try {
      const { id } = req.params;
      
      const bus = await Bus.findByPk(id);
      if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
      }

      const bookings = await Booking.findAll({
        where: { busId: id },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = busController;














// const db = require('../utils/db-connections');

// exports.addBus = (req, res) => {
//   const { busNumber, totalSeats, availableSeats } = req.body;
//   const sql = "INSERT INTO buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)";
//   db.execute(sql, [busNumber, totalSeats, availableSeats], (err) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(200).send("Bus added successfully");
//   });
// };

// exports.getAllBuses = (req, res) => {
//     db.execute("SELECT * FROM Buses", (err, results) => {
//         if (err) return res.status(500).send(err.message);
//         res.status(200).json(results);
//     });
// };

// exports.getAvailableBuses = (req, res) => {
//   const minSeats = req.params.seats;
//   const sql = "SELECT * FROM buses WHERE availableSeats > ?";
//   db.execute(sql, [minSeats], (err, results) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(200).json(results);
//   });
// };
