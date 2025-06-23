import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Artist from './artist.model.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
    profile: {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        nickname: { type: String, trim: true },
        profile_pic: String,
    },
    email: { type: String, required: true, unique: true},
    password: String,

    // Roles: if neither of these are true, the user is a general user.
    is_artist: { type: Boolean, default: false },  
    is_admin: { type: Boolean, default: false },  

    // Spotify tokens/credentials
    spotify: {
        id: String,
        name: String,
        access_token: String,                                       
        refresh_token: String,
        token_expires_at: Date,
    },

    fave_genres: [{ type: String, trim: true }],
    fave_artists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    // Only hash if password is new or has been changed by user
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('User', UserSchema);