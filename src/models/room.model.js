const { Schema, connection } = require("mongoose");
const bcrypt = require('bcrypt')

const Room = new Schema({
    roomID: {
        type: Schema.Types.ObjectId,
        // default:
        // require: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        require: true
    }]
    ,
    latestMessage: {
        type: String,
        require: true
    },
}, {
    timestamps: true
})




const room = connection.model('room', Room)
module.exports = room
