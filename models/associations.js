// models/associations.js
const User = require('./users');
const Bus = require('./buses');
const Booking = require('./booking');

// Define associations
// User and Booking relationship (One-to-Many)
User.hasMany(Booking, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Booking.belongsTo(User, {
  foreignKey: 'userId'
});

// Bus and Booking relationship (One-to-Many)
Bus.hasMany(Booking, {
  foreignKey: 'busId',
  onDelete: 'CASCADE'
});
Booking.belongsTo(Bus, {
  foreignKey: 'busId'
});

module.exports = {
  User,
  Bus,
  Booking
};