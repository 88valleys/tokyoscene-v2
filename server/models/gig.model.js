import mongoose from 'mongoose';

const { Schema } = mongoose;

const GigSchema = new Schema({
    location: {
        name: String,
        latitude: String,
        longitude: String
    },
    name: String, 
    date: Date,
    time: Date,
    description: String,
    genres: [{ type: String }],
    bands: [{ type: String }],
    image_url: String,
    ticket_url: String,

    // Relationships
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Gig', GigSchema);