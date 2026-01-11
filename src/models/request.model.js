const { Schema, connection } = require("mongoose");
const bcrypt = require("bcrypt");

const Request = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    reciverId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: Schema.Types.String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const request = connection.model("request", Request);
module.exports = request;
