const configFile = {
    jwtToken: process.env.LOCAL_JWT_TOKEN
}

console.log(process.env[process.env.ENV + "_JWT_TOKEN"]);

module.exports = configFile