import mongoose from 'mongoose';
import User from './user.model.js';
import { trim } from 'validator';
// import Gig from './models/gig.model.js';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
    // Associate an artist to a user if the user wants to link their user ID to the artist profile
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // TODO: Only implement the below value after the MVP is done!
    gigs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Gig', 
        required: true 
    }],
    name: { 
        type: String, 
        trim: true, 
        maxlength: 100, 
        required: true 
    },    
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    platform: { 
        type: String, 
        trim: true, 
        enum: [
            'instagram', 'youtube', 'apple music', 'spotify', 'twitter', 'facebook', 'tiktok','soundcloud', 'bandcamp', 'website', 'threads', 'patreon'
        ]
    },
    genres: [{ type: String, trim: true }],
    displayPic: {
        type: String,
        trim: true
    },
    // Imported from Spotify API
    bandTracks: [{ type: String, trim: true }],
});

export default mongoose.model('Artist', ArtistSchema);