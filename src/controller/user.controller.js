const db = require("../config/database")
const Responses = require('../responses/responses')
const responses = new Responses();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { jsonToString, jwtToken } = require("../services/extraService");


class UserController {


    createUser = async (req, res) => {
        const { name, email, password, phoneNumber } = req.body

        const retrieveData = {
            name: name ? name : "",
            email: email ? email : "",
            password: password ? password : "",
            phoneNumber: phoneNumber ? phoneNumber : "",
        }
        const user = await db.users.findOne({
            email: email,
        });
        if (user) {
            return responses.duplicateResponses(res, "Email Already Exit")
        } else {
            const createUser = await db.users.create(retrieveData)
            if (createUser) {
                return responses.successResponses(res, 'Create New User Successfully', createUser, true)
            } else {
                return responses.failResponses(res, "Fail To Create New User")
            }
        }



    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;


            console.log(req.body)
            const user = await db.users.findOne({
                email: email,
            });
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwtToken({ email, id: user._id })
                const userDataExtract = jsonToString(user)
                userDataExtract.token = token
                return responses.successResponses(res, 'Login Successfully', userDataExtract)

            } else {
                return responses.unauthorizedResponses(res, 'Unauthorized User')
            }

        } catch (error) {
            return responses.failResponses(res, 'An error occurred during login')
        }
    };
}


module.exports = UserController