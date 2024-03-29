let userRoute = require('express').Router()
// let userRoute = express.Router()
const UserController = require('../controller/user.controller')
const userValidator = require("../validation/user.validatiaon")
const allValidator = require('../middleware/validator')
const userController = new UserController()


userRoute.post('/create',allValidator(userValidator.userCreate),  async(req,res)=>{
    const result = await userController.createUser(req,res)
    res.send(result);
})


userRoute.post('/login', async (req, res) => {
    const result = await userController.login(req, res)
    res.send(result)
})

userRoute.get('/', async (req, res) => {
    const result = await userController.searchUser(req, res)
    res.send(result)
})
module.exports = userRoute