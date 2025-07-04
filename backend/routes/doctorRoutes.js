const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate, authorizeRoles } = require('../config/auth');

// Add available time slots
router.post('/slots', authenticate, authorizeRoles('Doctor'), doctorController.addSlot);

// View all users
router.get('/users', authenticate, authorizeRoles('Doctor'), doctorController.getAllUsers);

// View all appointments booked with this doctor
router.get('/appointments', authenticate, authorizeRoles('Doctor'), doctorController.getMyAppointments);

module.exports = router; 