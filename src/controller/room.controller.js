const db = require("../config/database")
const Responses = require('../responses/responses');
const responses = new Responses()

class RoomController {
    constructor() { }

    createRoom = async (req, res) => {
        const { users } = req.body

        const roomCreate = db.room.create({ users })
        if (roomCreate) {
            return responses.successResponses(res, 'Create Room Successfully', roomCreate, true)
        } else {
            return responses.failResponses(res, 'Fail to Create')
        }
    }
}

module.exports = RoomController