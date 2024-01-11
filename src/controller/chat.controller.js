const db = require("../config/database")
let ObjectId = require('mongoose').Types.ObjectId;
const Responses = require("../responses/responses")

const responses = new Responses()

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
                return responses.successResponses(res, 'Create Message', messageC, true)
            } else {

                return responses.failResponses(res, 'fail To Message')
            }

        } catch (error) {
            return responses.failResponses(res, "Internal Server Error")
        }

    }

    getChatMessage = async (req, res) => {
        try {
            const { chatId } = req.params
            // return chatId
            const getChatMessage = await db.chatMessage.find({ chatId: new ObjectId(chatId) })
            if (getChatMessage) {
                return responses.successResponses(res, 'Get Chat Message Successfully', getChatMessage, false)
            } else {
                return responses.failResponses(res, 'Get Chat Fail')
            }
        } catch (error) {
            return responses.failResponses(res, "Internal Server Error", error)
        }

    }
}

module.exports = ChatMessage
