import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const {id: userId} = req.params; // Assuming userId is passed as a parameter
    
        // Find conversations involving the specified user
        const conversations = await Conversation.find({ participants: userId });
    
        // Extract participant user IDs from conversations
        const participantUserIds = conversations.flatMap(conversation =>
          conversation.participants.filter(participantId => participantId.toString() !== userId.toString())
        );
    
        // Retrieve users based on the extracted user IDs
        const filteredUsers = await User.find({ _id: { $in: participantUserIds } }).select("-password");
    
        res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};