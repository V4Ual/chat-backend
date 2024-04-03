const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cron = require('node-cron');
const allRoutes = require('./routes')
const cors = require('cors')
dotenv.config()
app.use(express.json())


app.use(cors())
app.use('/api/v1',allRoutes)



module.exports =  app