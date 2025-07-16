const User = require('../models/users');

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).send("❌ Name and Email are required");
    }

    const newUser = await User.create({ name, email });

    res.status(201).json({
      message: `✅ User ${name} added`,
      user: newUser
    });
  } catch (error) {
    console.error("❌ Error adding user:", error.message);
    res.status(500).json({ error: '❌ Unable to add user', details: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).send(error.message);
  }
};




















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
