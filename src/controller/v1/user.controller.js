const db = require("../../config/database");
const bcrypt = require("bcrypt");
const { jsonToString, jwtToken } = require("../../services/extraService");
const {
  duplicateResponses,
  badRequest,
  successResponses,
  unauthorized
  ,
} = require("../../responses/response");
const { createPhoto } = require("../../services/image.service");

class UserController {
  constructor() { }
  createUser = async (req, res) => {
    try {

      const {
        firstName,
        email,
        password,
        phoneNumber,
        confirmPassword
      } = req.body;

      const file = req.file
      console.log(file);
      const fileName = Date.now()
      if (confirmPassword !== password) {
        return badRequest("confirm password does not match");
      }

      const retrieveData = {
        name: firstName ? firstName : "",
        email: email ? email : "",
        password: password ? password : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
      };

      console.log(retrieveData);
      const user = await db.users.findOne({
        email: email,
      });
      if (user) {
        return duplicateResponses("Email Already Exit");
      } else {
        const createUser = await db.users.create(retrieveData);
        if (createUser) {
          if (file) {
            retrieveData.profilePic = `${fileName}.png`
            await createPhoto(file.buffer, fileName)
          }
          return successResponses("Create New User Successfully", createUser);
        } else {
          return badRequest("Fail To Create New User", {});
        }
      }
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      return badRequest("Something went wrong", errorMessage);
    }
  };

  login = async (req, res) => {
    // try {
    const { email, password } = req.body;

    const user = await db.users.findOne({
      email: email,
    });
    console.log(user);
    if (!user) {
      return badRequest("User not fount this mail")
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch && user) {
      const token = jwtToken({ email, id: user._id });
      user._doc.token = token;
      return successResponses("Login Successfully", user);
    } else {
      return unauthorized("Unauthorized User", {});
    }
    // } catch (error) {
    //   return badRequest("An error occurred during login", {});
    // }
  };

  searchUser = async (req, res) => {
    const { search } = req.query;
    const findUser = await db.users.find({
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
      ],
    });
    if (findUser) {
      return successResponses("Search User", findUser);
    } else {
      return badRequest("Fail To request");
    }
  };
}

module.exports = UserController;
