const moment = require("moment");
const db = require("../../config/database");
const { successResponses, badRequest } = require("../../responses/response");
const { userList, getIO } = require("../../chat/socketStore");
let ObjectId = require("mongoose").Types.ObjectId;

class ChatMessage {
  constructor() {}

  createMessage = async (req, res) => {
    try {
      const { chatId, senderId, message, receiverId } = req.body;

      const socketId = userList.get(receiverId);
      const io = getIO();

      if (socketId && io) {
        io.to(socketId).emit("send::message", {
          text: message,
          timestamp: moment().format("HH:mm"),
          id: receiverId,
          isSent: false,
          status: "read",
          roomId: chatId,
        });
      }

      const messageCreate = {
        chatId: chatId,
        senderId: senderId,
        message: message,
      };
      // io.to(socketId).emit("send::messsage", {
      //   text: message,
      //   timestamp: moment(),
      //   receiverId,
      //   isSent: true,
      // });
      const messageC = await db.chatMessage.create(messageCreate);

      if (messageC) {
        return successResponses("Send message successfully", messageC);
      } else {
        return badRequest("Send Message Fail", {});
      }
    } catch (error) {
      return badRequest(res, "Internal Server Error");
    }
  };

  getChatMessage = async (req, res) => {
    try {
      const { userData } = req.headers;
      const { chatId } = req.params;

      const getChatMessage = await db.chatMessage.find({
        chatId: new ObjectId(chatId),
      });

      const formatMessage = getChatMessage.map((item) => {
        return {
          id: item._id,
          text: item.message,
          timestamp: moment(item.createdAt).format("HH:mm "),
          isSent: item.senderId.toString() === userData.id ? true : false,
          status: "read",
        };
      });

      if (getChatMessage) {
        return successResponses("Get Chat Message Successfully", formatMessage);
      } else {
        return badRequest("Get Chat Fail");
      }
    } catch (error) {
      return badRequest("Internal Server Error: ");
    }
  };
}

module.exports = ChatMessage;
