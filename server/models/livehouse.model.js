import mongoose from 'mongoose';
import User from './user.model.js';
import Event from './event.model.js';

import { GENRES } from '../constants/genres.js';
import { SOURCE_TYPES } from '../constants/sourceTypes.js';
import { LIVEHOUSE_SOCIAL_PLATFORMS } from '../constants/socialPlatforms.js';

const { Schema } = mongoose;

const LivehouseSchema = new Schema({
    name: { type: String, trim: true, maxlength: 100, required: true },

    address: {
        postalCode: {type: String, trim: true, maxlength: 8},
        prefecture: {type: String, trim: true, maxlength: 20},
        city: {type: String, trim: true, maxlength: 100},
        // 丁目番地号 + building name, in JP or EN
        street1: {type: String, trim: true, maxlength: 200},
        // Room number, additional notes, etc.
        street2: {type: String, trim: true, maxlength: 200}, 
        country: {
            type: String,
            required: true,
            default: 'Japan',
            enum: ['Japan']
        },
    },   

    phone: { type: String, trim: true, maxlength: 20 },
    email: { type: String, trim: true, maxlength: 100 },
    website: { type: String, trim: true, maxlength: 200 },

    capacity: { type: Number, min: 0 },

    socialLinks: [{
        platform: { type: String, enum: LIVEHOUSE_SOCIAL_PLATFORMS, trim: true },
        url: { type: String, trim: true }
    }],

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
    },

    description: { type: String, trim: true, maxlength: 500, required: true },
    genres: [{ type: String, trim: true, enum: GENRES }],    

    added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Indicate whether the livehouse was added by user or admin
    source: { type: String, enum: SOURCE_TYPES },
    // Used only if the source is: "scraped"
    scrapeData: [{
        scrapedFrom: { type: String, trim: true },
        firstScrapedAt: { type: Date },
        lastScrapedAt: { type: Date },
        updatedFields: [String],
    }],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],

    // Track how many users like the livehouse
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Livehouse', LivehouseSchema);