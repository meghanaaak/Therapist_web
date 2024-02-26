import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			refPath: 'senderType' // Dynamic reference path based on 'senderType'
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			refPath: 'receiverType' // Dynamic reference path based on 'receiverType'
		},
		senderType: {
			type: String,
			enum: ['User', 'Therapist'],
			required: true
		},
		receiverType: {
			type: String,
			enum: ['User', 'Therapist'],
			required: true
		},
		message: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;