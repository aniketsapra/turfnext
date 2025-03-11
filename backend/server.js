import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bookingRoutes from './booking.js';
import { verifyJWT } from './middleware/auth.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const PORT = 5000;
// Define dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api/bookings', bookingRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueId: { type: Number, unique: true, default: () => Math.floor(Math.random() * 1000000) }, // Random 6-digit ID
});

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email, phone, or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique ID
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = Math.floor(100000 + Math.random() * 900000); // Ensure it's always 6 digits
      const existingId = await User.findOne({ uniqueId });
      if (!existingId) isUnique = true;
    }

    // Create user
    const user = new User({ username, email, phone, password: hashedPassword, uniqueId });
    await user.save();

    res.status(201).json({ message: 'User created successfully', uniqueId: user.uniqueId });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Error creating user', details: err.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
});

app.get('/api/user', verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email phone uniqueId');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data', details: err.message });
  }
});

// Protected route
app.get('/api/main', verifyJWT, (req, res) => {
  res.json({ message: 'Protected route accessed!', user: req.user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
