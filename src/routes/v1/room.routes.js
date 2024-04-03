const roomRoutes = require('express').Router()
const roomModule = require('../../controller')
const roomController = new roomModule.roomCtr()

roomRoutes.post('/room-create', async (req, res) => {
    let result = await roomController.createRoom(req, res)
    res.send(result)
})


roomRoutes.get('/user-list/:usersId', async (req, res) => {
    let result = await roomController.getUserList(req, res)
    return result
})

module.exports = roomRoutes