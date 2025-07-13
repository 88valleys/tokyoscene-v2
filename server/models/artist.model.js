import mongoose from 'mongoose';
import User from './user.model.js';
import Event from './models/event.model.js';

import { GENRES } from '../constants/genres.js';
import { ARTIST_SOCIAL_PLATFORMS } from '../constants/socialPlatforms.js';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
    // Associate an artist to a user if the user wants to link their user ID to the artist profile
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // TODO: Only implement the below value after the MVP is done!
    events: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event'
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

    socialLinks: [{
        platform: { type: String, enum: ARTIST_SOCIAL_PLATFORMS, trim: true },
        url: { type: String, trim: true }
    }],

    genres: [{ 
        type: String, trim: true, enum: GENRES 
    }],    
    
    displayPic: { type: String, trim: true },
    // Imported from Spotify API
    bandTracks: [{ type: String, trim: true }],
});

export default mongoose.model('Artist', ArtistSchema);