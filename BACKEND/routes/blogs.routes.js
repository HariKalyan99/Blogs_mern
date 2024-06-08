const { readBlogs, postBlogs, deleteBlogs, editBlogs, searchBlogs } = require('../controllers/blogs.controllers');

const blogsRoutes = require('express').Router();


blogsRoutes.get("/read", readBlogs);
blogsRoutes.get("/search", searchBlogs)
blogsRoutes.post("/new", postBlogs);
blogsRoutes.delete("/remove/:id", deleteBlogs);
blogsRoutes.put("/edit/:id", editBlogs);


module.exports = blogsRoutes;