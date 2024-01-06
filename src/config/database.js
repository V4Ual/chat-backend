const mongoose = require('mongoose')
const dotenv =require('dotenv')
dotenv.config()

console.log(process.env[process.env.ENV + "_DB_URL"]);

mongoose.connect(process.env[process.env.ENV + "_DB_URL"])

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
    users: require('../models/user.model')
}


module.exports = connection
module.exports = db