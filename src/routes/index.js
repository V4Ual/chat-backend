const routes = require('express').Router()
const userRoute = require('./user.routes')

routes.use('/users',userRoute)



module.exports = routes



