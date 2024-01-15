const chatRoutes = require('express').Router()
const ChatController = require('../controller/chat.controller')
const chatController = new ChatController()

chatRoutes.post('/message', async (req, res) => {
    const result = await chatController.createMessage(req, res)
     res.send(result)
})

chatRoutes.get('/:chatId', async (req, res) => {
    const result = await chatController.getChatMessage(req, res)
    return result
})




module.exports = chatRoutes

