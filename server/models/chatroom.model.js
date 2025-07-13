import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChatroomSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
},  { timestamps: true });

// Give the chatroom name the event name
ChatroomSchema.virtual('name').get(function() {
    return this.event && this.event.name ? this.event.name : '';
});

ChatroomSchema.index({ event: 1 }, { unique: true });

export default mongoose.model('Chatroom', ChatroomSchema);