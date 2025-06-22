import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

    // TODO: Define is_band boolean

    spotify: {
        id: String,
        name: String,
        access_token: String,                                       
        refresh_token: String,
        token_expires_at: Date,
    },
    fave_genres: [{ type: String, trim: true }],
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