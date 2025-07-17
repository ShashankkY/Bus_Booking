const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/:id/bookings', userController.getUserBookings);

module.exports = router;

