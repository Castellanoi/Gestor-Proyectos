
import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.model';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// Connect to MongoDB (update URI as needed)
mongoose.connect('mongodb://localhost:27017/gestor-proyectos')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  // Password requirements: 6+ chars, 1 upper, 1 lower, 1 number, 1 symbol
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password does not meet requirements.' });
  }
  // Check if user exists
  const existing = await User.findOne({ name: username });
  if (existing) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  // Create user
  try {
    const user = new User({ name: username, email: username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// (Optional) Export app for server start
export default app;
