const roomRoutes = require('express').Router()
const roomModule = require('../../controller')
const { authService } = require('../../services/auth.service')
const roomController = new roomModule.roomCtr()

roomRoutes.post('/room-create', async (req, res) => {
    let result = await roomController.createRoom(req, res)
    res.send(result)
})


roomRoutes.get('/user-list', authService, async (req, res) => {
    let result = await roomController.getUserList(req, res)
    res.status(result.statusCode).send(result)
})

module.exports = roomRoutes