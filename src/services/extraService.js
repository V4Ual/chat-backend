const jwt = require('jsonwebtoken');
const Responses = require('../responses/responses');

exports.jsonToString = (data) => {
    return JSON.parse(JSON.stringify(data));
}


exports.jwtToken = (data) => {
    return jwt.sign(data, process.env.JWT_TOKEN)
} 

exports.responses = () => {
    const Responses = new Responses()
    return Responses
}