const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bus_booking', 'root', 'Shashank@12', {
  host: 'localhost',
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to the Database has been established");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();

module.exports = sequelize;











// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Shashank@12', // Use your actual password
//     database: 'bus_booking'        // Ensure this DB already exists
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.log("Error connecting to DB:", err);
//         return;
//     }

//     console.log("✅ Connected to MySQL database");

//     // Create Users table
//     const usersTable = `
//         CREATE TABLE IF NOT EXISTS Users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255),
//             email VARCHAR(255)
//         )
//     `;

//     // Create Buses table
//     const busesTable = `
//         CREATE TABLE IF NOT EXISTS Buses (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             busNumber VARCHAR(50),
//             totalSeats INT,
//             availableSeats INT
//         )
//     `;

//     // Create Bookings table
//     const bookingsTable = `
//         CREATE TABLE IF NOT EXISTS Bookings (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             seatNumber INT,
//             userId INT,
//             busId INT,
//             FOREIGN KEY (userId) REFERENCES Users(id),
//             FOREIGN KEY (busId) REFERENCES Buses(id)
//         )
//     `;

//     // Create Payments table
//     const paymentsTable = `
//         CREATE TABLE IF NOT EXISTS Payments (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//              bookingId INT,
//             amountPaid DECIMAL(10, 2),
//             paymentStatus VARCHAR(50),
//             FOREIGN KEY (bookingId) REFERENCES Bookings(id)
//         )
//     `;

//     // Execute queries in order
//     connection.execute(usersTable, (err) => {
//         if (err) return console.log("❌ Error creating Users table:", err);
//         console.log("✅ Users table created");

//         connection.execute(busesTable, (err) => {
//             if (err) return console.log("❌ Error creating Buses table:", err);
//             console.log("✅ Buses table created");

//             connection.execute(bookingsTable, (err) => {
//                 if (err) return console.log("❌ Error creating Bookings table:", err);
//                 console.log("✅ Bookings table created");

//                 connection.execute(paymentsTable, (err) => {
//                     if (err) return console.log("❌ Error creating Payments table:", err);
//                     console.log("✅ Payments table created");
//                 });
//             });
//         });
//     });
// });

// module.exports = connection;