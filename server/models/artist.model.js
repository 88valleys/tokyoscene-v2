import mongoose from 'mongoose';
import User from './user.model.js';
// import Gig from './models/gig.model.js';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // TODO: Only implement the below value after the VP is done!
    // gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
    
    name: String,
    description: String,
    genres: [{ type: String, trim: true }],
    display_pic: String,
    band_tracks: [{ type: String }],
});

export default mongoose.model('Artist', ArtistSchema);