const db = require("../config/database")
const Responses = require('../responses/responses')
const responses = new Responses();


class UserController {


    createUser = async (req, res) => {
        const { name, email, password, phoneNumber } = req.body

        const retrieveData = {
            name: name ? name : "",
            email: email ? email : "",
            password: password ? password : "",
            phoneNumber: phoneNumber ? phoneNumber : "",
        }

        const createUser = await db.users.create(retrieveData)
        if (createUser) {
            return responses.successResponses(res, 'Create New User Successfully', createUser, true)
        } else {
            return responses.failResponses(res, "Fail To Create New User")
        }

    }
}


module.exports = UserController