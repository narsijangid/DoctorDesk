const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Add available time slots
exports.addSlot = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { slots } = req.body; // slots: array of strings
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    doctor.availableSlots = [...doctor.availableSlots, ...slots];
    await doctor.save();
    res.json({ availableSlots: doctor.availableSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all appointments booked with this doctor
exports.getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctorId }).populate('userId', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 