const db = require("../config/database")
const bcrypt = require('bcrypt')
const { jsonToString, jwtToken } = require("../services/extraService");
const { duplicateResponses, failResponses } = require("../responses/response");


class UserController {
    createUser = async (req, res) => {
        const { name, email, password, phoneNumber, confirmPassword } = req.body

        if (confirmPassword !== password) {
            return responses.failResponses(res, 'Password Doest mach')
        }

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
            return duplicateResponses(res, "Email Already Exit")
        } else {
            const createUser = await db.users.create(retrieveData)
            if (createUser) {
                return successResponses('Create New User Successfully', createUser)
            } else {
                return failResponses("Fail To Create New User", {})
            }
        }



    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;


            const user = await db.users.findOne({
                email: email,
            });
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch && user) {
                const token = jwtToken({ email, id: user._id })
                const userDataExtract = jsonToString(user)
                userDataExtract.token = token
                return successResponses(res, 'Login Successfully', userDataExtract)

            } else {
                return unauthorizedResponses('Unauthorized User', {})
            }

        } catch (error) {
            return failResponses('An error occurred during login', {})
        }
    };


    searchUser = async (req, res) => {
        const { search } = req.query
        const findUser = await db.users.find({
            $or: [
                { name: { $regex: new RegExp(search, 'i') } },
                { email: { $regex: new RegExp(search, 'i') }, }

            ]
        })
        if (findUser) {
            return successResponses('Search User', findUser)
        } else {
            return failResponses('Fail To request')
        }
    }
}


module.exports = UserController