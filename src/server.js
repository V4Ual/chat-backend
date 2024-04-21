const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cron = require('node-cron');
const allRoutes = require('./routes')
const cors = require('cors')
const path = require('path')
dotenv.config()
app.use(express.json())


app.use(cors())
app.use("/public", express.static(path.join('public')))
app.use('/api', allRoutes)



module.exports =  app