const Bus = require('../models/buses');
const { Sequelize } = require('sequelize');


exports.addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;

    console.log("📥 Incoming request body:", req.body); // Debug

    // Validate request
    if (!busNumber || !totalSeats || !availableSeats) {
      return res.status(400).send("❌ Missing fields in request body");
    }

    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });

    res.status(201).json({ message: '✅ Bus added successfully', bus });
  } catch (error) {
    console.error("❌ Error adding bus:", error.message);  // Show actual error
    res.status(500).json({ error: '❌ Unable to add bus', details: error.message });
  }
};

exports.getAvailableBuses = async (req, res) => {
  try {
    const minSeats = parseInt(req.params.seats);
    const buses = await Bus.findAll({
      where: Sequelize.literal(`availableSeats > ${minSeats}`)
    });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};




























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
