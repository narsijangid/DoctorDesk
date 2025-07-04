const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Medical Backend API Running');
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); 