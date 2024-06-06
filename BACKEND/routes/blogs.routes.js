const { readBlogs, postBlogs, deleteBlogs, editBlogs } = require('../controllers/blogs.controllers');

const blogsRoutes = require('express').Router();


blogsRoutes.get("/read", readBlogs);
blogsRoutes.post("/new", postBlogs);
blogsRoutes.delete("/remove/:id", deleteBlogs);
blogsRoutes.put("/edit/:id", editBlogs);


module.exports = blogsRoutes;