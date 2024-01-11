const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env[process.env.ENV + "_DB_URL"]);


if (process.env.ENV == 'TEST') {
    mongoose.connect(process.env[process.env.ENV + "_DB_URL"])
} else {
    mongoose.connect(process.env[process.env.ENV + "_DB_URL"])
}

const connection = mongoose.connection

connection.on('connected', () => {
    console.log('MongoDB connected');
});

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

let db = {
    users: require('../models/user.model'),
    room: require('../models/room.model'),
    chatMessage: require('../models/chat.model')
}


module.exports = connection
module.exports = db