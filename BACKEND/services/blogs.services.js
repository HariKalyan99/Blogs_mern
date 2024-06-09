const BlogsModel = require("../models/blogs.model")

class BlogsServices {
    read = async() => {
        try{
            const result = await BlogsModel.find();
            return result;
        }catch(error){  
            throw error
        }
    }

    create = async(blog) => {
        try{
            const posts = new BlogsModel({...blog});
            const result = await posts.save();
            return result;
        }catch(error){
            throw error
        }
    }

    delete = async(id) => {
        try{
            const result = await BlogsModel.findOneAndDelete({_id: id});
            return result;
        }catch(error){
            throw error;
        }
    }

    update = async(id, blog) => {
        try{
            const result = await BlogsModel.findOneAndUpdate({_id: id}, {...blog}, {new: true});
            return result;
        }catch(error){
            throw error;
        }
    }

    search = async(title) => {
        try{
            const result = await BlogsModel.find({title: {$regex : new RegExp(title)}});
            return result;
        }catch(error){
            throw error
        }
    }

    userList = async(fullname) => {
        try{
            const result = await BlogsModel.find({fullname});
            return result;
        }catch(error){
            throw error;
        }
    }
}

module.exports = BlogsServices;