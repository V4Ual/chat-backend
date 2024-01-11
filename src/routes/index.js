const routes = require('express').Router()
const roomRoutes = require('./room.routes')
const userRoute = require('./user.routes')
const chatRoute = require('../routes/chat.routes')

routes.use('/users', userRoute)
routes.use('/chat', chatRoute)
routes.use('/room', roomRoutes)



module.exports = routes



