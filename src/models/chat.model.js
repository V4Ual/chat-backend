const { Schema, connection } = require("mongoose");
const bcrypt = require('bcrypt')

const ChatMessage = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    message: {
        type: String,
        require: true
    },
}, {
    timestamps: true
})




const chatMessage = connection.model('chatMessage', ChatMessage)
module.exports = chatMessage
