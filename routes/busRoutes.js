const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');

router.post('/buses', busController.createBus);
router.get('/buses', busController.getAllBuses);
router.get('/buses/:id', busController.getBusById);
router.get('/buses/:id/bookings', busController.getBusBookings);


module.exports = router;
