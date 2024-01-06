const express = require('express')
const app = express()
const dotenv = require('dotenv')
const allRoutes = require('./routes')
dotenv.config()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/v1',allRoutes)



module.exports =  app