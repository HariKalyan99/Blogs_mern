const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, maxlength: 50},
    fullname: {type: String, unique: true, required: true, maxlength: 50},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
}, {timestamps: true})

const AuthModel = new mongoose.model("Blogs", authSchema, 'blogs');

module.exports = AuthModel;