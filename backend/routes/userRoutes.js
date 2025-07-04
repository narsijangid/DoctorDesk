const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../config/auth');

// View available doctors
router.get('/doctors', authenticate, authorizeRoles('User'), userController.getDoctors);

// Check doctor availability
router.get('/doctor/:doctorId/slots', authenticate, authorizeRoles('User'), userController.getDoctorSlots);

// Book appointment
router.post('/appointments', authenticate, authorizeRoles('User'), userController.bookAppointment);

// View user's own appointments
router.get('/appointments', authenticate, authorizeRoles('User'), userController.getMyAppointments);

module.exports = router; 