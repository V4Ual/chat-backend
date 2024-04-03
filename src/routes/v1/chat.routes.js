const chatRoutes = require('express').Router()
const chatModule = require('../../controller')
const chatController = new chatModule.chatCtr()

chatRoutes.post('/message', async (req, res) => {
    const result = await chatController.createMessage(req, res)
    res.status(result.statusCode).send(result)
})

chatRoutes.get('/:chatId', async (req, res) => {
    const result = await chatController.getChatMessage(req, res)
    res.status(result.statusCode).send(result)
})




module.exports = chatRoutes

