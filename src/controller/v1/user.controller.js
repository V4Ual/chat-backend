const db = require("../../config/database");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const { ObjectId } = mongoose.ObjectId
const { jsonToString, jwtToken } = require("../../services/extraService");
const {
  duplicateResponses,
  badRequest,
  successResponses,
  unauthorized
  ,
} = require("../../responses/response");
const { createPhoto, deletePhoto } = require("../../services/image.service");

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

      const user = await db.users.findOne({
        email: email,
      });
      if (user) {
        return badRequest("Email Already Exit");
      } else {
        if (file) {
          retrieveData.profilePic = `${fileName}.png`
          await createPhoto(file.buffer, fileName)
        }
        const createUser = await db.users.create(retrieveData);
        if (createUser) {
          return successResponses("Create New User Successfully", createUser);
        } else {
          return badRequest("Fail To Create New User", {});
        }
      }
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      return badRequest(errorMessage);
    }
  };

  login = async (req, res) => {
    // try {
    const { email, password } = req.body;

    const user = await db.users.findOne({
      email: email,
    });
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

    },

    );

    findUser.map(user => {
      user.profilePic = process.env[process.env.ENV + "_IMAGE_URL"] + user.profilePic
    });
    if (findUser) {
      return successResponses("Search User", findUser);
    } else {
      return badRequest("Fail To request");
    }
  };

  updateUser = async (req, res) => {
    const userID = req.headers.userData.id;
    const {
      firstName,
      email,
      password,
      phoneNumber,
      confirmPassword
    } = req.body;


    const userFind = await db.users.findOne({
      _id: new Object(userID),
    });

    if (!userFind) {
      return badRequest("User not Found this email", {})
    }
    const prepareData = {}
    const file = req.file
    const fileName = Date.now()
    if (file) {
      prepareData.profilePic = `${fileName}.png`
      await createPhoto(file.buffer, fileName)
    }

    if (userFind.profilePic) {
      await deletePhoto(userFind.profilePic)
    }

    firstName ? prepareData.name = firstName : "";
    email ? prepareData.email = email : "";
    password ? prepareData.password = password : "";
    phoneNumber ? prepareData.phoneNumber = phoneNumber : "";
    confirmPassword ? prepareData.confirmPassword = confirmPassword : "";

    const updateProfile = await db.users.updateOne({ _id: new Object(userID) }, prepareData)
    if (!updateProfile) {
      return badRequest('Fail to update Profile', {})
    }
    if (updateProfile) {
      return successResponses("Update Profile Successfully", updateProfile)
    }


  }

  getProfile = async (req, res) => {
    const userId = req.headers.userData.id

    const findUserDetails = await db.users.findOne({ _id: new Object(userId) })
    if (findUserDetails) {
      return successResponses('get-user Details successfully', findUserDetails)
    } else {
      return badRequest('fail to get details')
    }
  }

}

module.exports = UserController;
