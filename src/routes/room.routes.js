const roomRoutes = require('express').Router()
const RoomController = require('../controller/room.controller')
const roomController = new RoomController()

roomRoutes.post('/room-create', async (req, res) => {
    let result = await roomController.createRoom(req, res)
    res.send(result)
})


module.exports = roomRoutes