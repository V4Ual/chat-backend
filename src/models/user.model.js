const { Schema, connection } = require("mongoose");
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    profilePic: {
      type: String,
      require: false,
      get: obfuscate,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

function obfuscate(profilePic) {
  return process.env[process.env.ENV + "_IMAGE_URL"] + profilePic;
}

const user = connection.model("users", User);
module.exports = user;
