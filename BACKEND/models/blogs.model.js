const mongoose = require('mongoose');


const blogsSchema = new mongoose.Schema({
    author: {type: String, required: true, maxlength: 50},
    title: {type: String, required: true, maxlength: 150},
    body: {type: String, required: true, maxlength: 500},
    tags: {type: [String]}
}, {timestamps: true});



const BlogsModel = new mongoose.model("Blogs", blogsSchema, "blogs");


module.exports = BlogsModel;