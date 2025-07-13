import mongoose from 'mongoose';
import User from './user.model.js';
import Event from './event.model.js';

const { Schema } = mongoose;

const AttendanceSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['none', 'interested', 'going', 'not going', 'maybe'],
    default: 'none'
  },

  // Relationships
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  
}, { timestamps: true });

AttendanceSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);