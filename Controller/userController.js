const { User, Booking, Bus } = require('../models/associations');

const userController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user by ID
async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all bookings for a specific user with bus details
  async getUserBookings(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const bookings = await Booking.findAll({
        where: { userId: id },
        include: [{
          model: Bus,
          attributes: ['busNumber', 'totalSeats', 'availableSeats']
        }]
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;




















// const db = require('../utils/db-connections');

// exports.addUser = (req, res) => {
//   const { name, email } = req.body;
//   const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
//   db.execute(sql, [name, email], (err, result) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(200).send("User added successfully");
//   });
// };

// exports.getUsers = (req, res) => {
//   db.execute("SELECT * FROM users", (err, results) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(200).json(results);
//   });
// };
