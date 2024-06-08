const BlogsServices = require("../services/blogs.services");
const Blogs = new BlogsServices();

const readBlogs = async(request, response) => {
    try{
        const result = await Blogs.read();
        return response.status(200).json(result);
    }catch(error){
        return response.status(404).json({message: error.message})
    }
}

const postBlogs = async(request, response) => {
    try{
        const result = await Blogs.create({...request.body});
        return response.status(200).json(result);
    }catch(error){
        return response.status(404).json({message: error.message})
    }
}


const editBlogs = async(request, response) => {
    const {id} = request.params;
    try{
        const result = await Blogs.update(id, {...request.body});
        return response.status(200).json(result);
    }catch(error){
        return response.status(404).json({message: error.message})
    }
}

const deleteBlogs = async(request, response) => {
    const {id} = request.params;
    try{
        const result = await Blogs.delete(id);
        return response.status(200).json(result);
    }catch(error){
        return response.status(404).json({message: error.message})
    }
}     

const searchBlogs = async(request, response) => {
    const {title} = request.query;
    try{
        const result = await Blogs.search(title);
        return response.status(200).json(result)
    }catch(error){
        return response.status(404).json({message: error.message})
    }
}

module.exports = {
    readBlogs, deleteBlogs, editBlogs, postBlogs,searchBlogs
}