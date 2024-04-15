const jwt = require('jsonwebtoken');
const configFile = require('../config/config');

exports.jsonToString = (data) => {
    return JSON.parse(JSON.stringify(data));
}


exports.jwtToken = (data) => {
    return jwt.sign(data, configFile.jwtToken)
}

