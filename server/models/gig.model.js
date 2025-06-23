import mongoose from 'mongoose';

import User from './user.model.js';
import Artist from './artist.model.js';
import Livehouse from './livehouse.model.js';

const { Schema } = mongoose;

const GigSchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    // Access livehouse address and lat/long from this value
    livehouse: { type: Schema.Types.ObjectId, ref: 'Livehouse'},
    name: String, 
    datetime: Date,
    description: String,
    genres: [{ type: String }],
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    ticket_url: String,
    image_url: String,
    // Flag whether the gig is scraped or user-created
    scraped: Boolean,
}, { timestamps: true });

export default mongoose.model('Gig', GigSchema);