import mongoose from 'mongoose';
import User from './models/user.model.js';

const { Schema } = mongoose;

const LivehouseSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    name: String,
    address: String,                                       
    description: String,
    genres: [{ type: String, trim: true }],
    location: {
        type: {
            // Required for GeoJSON
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            // Required for geospatial queries
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
});

export default mongoose.model('Livehouse', LivehouseSchema);