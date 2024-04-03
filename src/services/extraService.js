const jwt = require('jsonwebtoken');

exports.jsonToString = (data) => {
    return JSON.parse(JSON.stringify(data));
}


exports.jwtToken = (data) => {
    return jwt.sign(data, process.env["LOCAL_" + process.env.JWT_TOKEN])
}

