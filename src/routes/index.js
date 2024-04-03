const routes = require("express").Router()

routes.use("/v1", require('./v1'))


module.exports = routes