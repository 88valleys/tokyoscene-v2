import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

import Artist from './artist.model.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
    profile: {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        nickname: { type: String, trim: true },
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
    password: String,
    salt: String,

    roles: { 
        type: [{ 
            type: String,
            enum: ['user', 'artist', 'admin', 'moderator', 'promoter' ] 
        }], 
        default: ['user']
    },

    // Spotify tokens/credentials
    spotify: {
        id: String,
        accessToken: String,                
        refreshToken: String,
    },

    favGenres: [{ 
        type: String, 
        trim: true,
        enum: [
            'alternative',
            'pop',
            'rock',
            'jazz',
            'electronic',
            'classical',
            'hip hop',
        ]
    }],

    favArtists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]
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