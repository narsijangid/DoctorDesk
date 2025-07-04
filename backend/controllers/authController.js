const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register (User or Doctor)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;
    if (role === 'Doctor') {
      if (!specialization) return res.status(400).json({ message: 'Specialization required for doctor' });
      const existing = await Doctor.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Doctor already exists' });
      const doctor = new Doctor({ name, email, password, specialization });
      await doctor.save();
      const token = generateToken(doctor);
      return res.status(201).json({ token, role: doctor.role, name: doctor.name });
    } else {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });
      const user = new User({ name, email, password, role: 'User' });
      await user.save();
      const token = generateToken(user);
      return res.status(201).json({ token, role: user.role, name: user.name });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (User or Doctor)
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === 'Doctor') {
      user = await Doctor.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 