const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register (User or Doctor)
router.post('/register', authController.register);

// Login (User or Doctor)
router.post('/login', authController.login);

module.exports = router; 