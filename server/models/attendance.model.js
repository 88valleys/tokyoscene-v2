import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttendanceSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['none', 'interested', 'going', 'not going', 'maybe'],
    default: 'none'
  },

  // Relationships
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  
}, { timestamps: true });

AttendanceSchema.index({ user: 1, gig: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);