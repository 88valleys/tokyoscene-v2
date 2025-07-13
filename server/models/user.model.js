import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

import { GENRES } from '../constants/genres.js';
import { USER_SOCIAL_PLATFORMS } from '../constants/socialPlatforms.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
    profile: {
        firstName: { type: String, trim: true, maxlength: 30 },
        lastName: { type: String, trim: true, maxlength: 30 },
        nickname: { type: String, trim: true, maxlength: 20 },
        profilePic: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [
            email => validator.isEmail(),
            'Please fill a valid email address'
        ]
    },    
    password: {
        type: String,
        minlength: 8, 
        maxlength: 16,
        validate: [
            {
                validator: function(v) {
                    // Password should be at least one number, one symbol, and max 16 chars
                    return /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v) && v.length <= 16;
                },
                message: 'Password must be up to 16 characters and include at least one number and one symbol.'
            }
        ]
    },
    salt: String,

    socialLinks: [{
        platform: { 
            type: String, 
            enum: USER_SOCIAL_PLATFORMS, 
            trim: true 
        },
        url: { type: String, trim: true }
    }],

    roles: { 
        type: [{ 
            type: String,
            enum: ['user', 'artist', 'admin', 'moderator', 'promoter' ] 
        }], 
        default: ['user']
    },

    // If null or not set, the user is not banned. If set, user is banned until this date. For permanent ban, use a far future date (e.g., 9999-01-01).
    locked: Date,

    // Spotify tokens/credentials
    spotify: {
        id: String,
        accessToken: String,                
        refreshToken: String,
    },

    payments: [{
        stripeChargeId: String,
        adminId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
        adminName: { type: String, trim: true },
        date: { type: Date, default: Date.now },
    }],

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    favGenres: [{ type: String, trim: true, enum: GENRES }],

    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}],

    friendsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    // Get user's current location
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        }
    }
});

// Hash the password before saving
const hashPassword = (password, salt) => (
    password &&
    salt &&
    crypto
        .pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'sha1')
        .toString('base64')
);

UserSchema.pre('save', function hashPasswordForSave(next) {
    const user = this;

    if (user.password && user.isModified('password')) {
        user.salt = crypto.randomBytes(16).toString('base64');
        user.password = hashPassword(user.password, user.salt);
    }

    next();
});

UserSchema.statics.authenticate = function(password, userPassword, userSalt) {
    return userPassword === hashPassword(password, userSalt);
};

export default mongoose.model('User', UserSchema);