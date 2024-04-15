const { Schema, connection } = require("mongoose");
const bcrypt = require('bcrypt')

const User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    profilePic: {
        type: String,
        require: false
    }

}, {
    timestamps: true
})

User.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});



const user = connection.model('users', User)
module.exports = user
