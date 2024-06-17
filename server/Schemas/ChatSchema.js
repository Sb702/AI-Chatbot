const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
        required: true,
    },
    responses: {
        type: Array,
        required: true,
    },
    lastMessage: {
        type: String,
    },
    lastResponse: {
        type: String,
    },
    user: {
        type: String,
        required: true,
    },
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;