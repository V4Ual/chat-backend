const db = require("../../config/database");
const { successResponses, badRequest } = require("../../responses/response");
let ObjectId = require('mongoose').Types.ObjectId;

class ChatMessage {
    constructor() { }

    createMessage = async (req, res) => {
        try {
            const { chatId, senderId, message } = req.body

            const messageCreate = {
                chatId: chatId,
                senderId: senderId,
                message: message
            }
            const messageC = await db.chatMessage.create(messageCreate)
            if (messageC) {
                return successResponses("Send message successfully", messageC)
            } else {
                return badRequest('Send Message Fail', {})
            }

        } catch (error) {
            return badRequest(res, "Internal Server Error")
        }

    }

    getChatMessage = async (req, res) => {
        try {
            const { chatId } = req.params
            const getChatMessage = await db.chatMessage.find({ chatId: new ObjectId(chatId) })
            if (getChatMessage) {
                return successResponses('Get Chat Message Successfully', getChatMessage)
            } else {
                return badRequest('Get Chat Fail')
            }
        } catch (error) {
            return badRequest("Internal Server Error")
        }

    }
}

module.exports = ChatMessage
