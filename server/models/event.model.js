import mongoose from 'mongoose';

import User from './user.model.js';
import Artist from './artist.model.js';
import Livehouse from './livehouse.model.js';

import { GENRES } from '../constants/genres.js';
import { SOURCE_TYPES } from '../constants/sourceTypes.js';

const { Schema } = mongoose;

const EventSchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    // Access livehouse address and lat/long from this value
    livehouse: { type: Schema.Types.ObjectId, ref: 'Livehouse'},

    name: { type: String, trim: true, maxlength: 100, required: true },
    doorsOpen: Date,
    endTime: Date,
    price: { type: Number, min: 0, max: 20000 },    
    description: { type: String, trim: true, maxlength: 500, required: true },
    
    genres: [{ type: String, trim: true, enum: GENRES }],    
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    
    ticket_url: String,
    banner_img: String,

    // Flag whether the event is scraped or user-created
    source: { type: String, enum: SOURCE_TYPES },
    // Used only if the source is: "scraped"
    scrapeData: [{
        scrapedFrom: { type: String, trim: true },
        firstScrapedAt: { type: Date },
        lastScrapedAt: { type: Date },
        updatedFields: [String],
    }],

}, { timestamps: true });

export default mongoose.model('Event', EventSchema);