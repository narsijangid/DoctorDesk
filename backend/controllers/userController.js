const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// View available doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, '-password -availableSlots');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check doctor availability (slots)
exports.getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId, 'name availableSlots');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ name: doctor.name, availableSlots: doctor.availableSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorId, date, time } = req.body;
    // Check if slot is available
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    if (!doctor.availableSlots.includes(time)) {
      return res.status(400).json({ message: 'Selected time slot not available' });
    }
    // Create appointment
    const appointment = new Appointment({ doctorId, userId, date, time, status: 'Booked' });
    await appointment.save();
    // Remove slot from doctor's availableSlots
    doctor.availableSlots = doctor.availableSlots.filter(slot => slot !== time);
    await doctor.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View user's own appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ userId }).populate('doctorId', 'name email specialization');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 