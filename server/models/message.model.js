import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    chatroom: { type: Schema.Types.ObjectId, ref: 'Chatroom', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);