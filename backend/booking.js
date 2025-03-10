import express from 'express';
import mongoose from 'mongoose';
import { verifyJWT } from './middleware/auth.js';

const router = express.Router();

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uniqueId: { type: Number, required: true }, // Store user's uniqueId
  turf: { type: String, required: true },
  activity: { type: String, required: true },
  timeslot: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);

// Booking route
router.post('/', verifyJWT, async (req, res) => {
  const { turf, activity, timeslot, date } = req.body;

  try {
    const user = await mongoose.model('User').findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const existingBooking = await Booking.findOne({ turf, activity, timeslot, date });
    if (existingBooking) {
      return res.status(400).json({ error: 'Slot already booked. Please choose a different time or date.' });
    }
    
    const booking = new Booking({
      userId: req.user.id,
      uniqueId: user.uniqueId,
      turf,
      activity,
      timeslot,
      date,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save booking', details: err.message });
  }
});

// booking.js - Add route to fetch bookings by uniqueId
router.get('/user/:uniqueId', verifyJWT, async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const bookings = await Booking.find({ uniqueId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
});

// booking.js - Add route to delete a booking by ID
router.delete('/:id', verifyJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking', details: err.message });
  }
});


export default router;
