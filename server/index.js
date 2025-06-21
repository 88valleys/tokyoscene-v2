import dotenv from 'dotenv';
dotenv.config({ path: 'server/config.env' });

import mongoose from 'mongoose';
import User from './models/user.model.js';
import Gig from './models/gig.model.js';
import Attendance from './models/attendance.model.js';

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create a new user
const user = new User({
    profile: { 
        firstName: "Senie",
        lastName: "C",
        nickname: "Sen",
    },
    email: "senie@sen.com",
    password: "Sen",
    fave_genres: [ "hyperpop", "electronic", "alternative", "kpop" ],
});

const gig = new Gig({
    location: {
        name: "Gamuso",
        latitude: "35.70510772771988",
        longitude: "139.63459572708345",
    },
    name: "H&HC EP1: Release Party",
    date: new Date("2025-08-31"),
    time: new Date("2025-08-31T20:00:00+09:00"),
    description: ("Come suss out H&HC's first EP 💣"),
    genres: ["alternative", "emo", "pop-punk"],
    bands: ["His & Her Circumstances"],
    created_by: user._id
});

const attendance = new Attendance({
    status: 'going',
    user: user._id,
    gig: gig._id
});

console.log(user);
console.log(gig);
console.log(attendance);

// Insert the user in the MongoDB database
await user.save();
await gig.save();
await attendance.save();
console.log("Saved successfully!")