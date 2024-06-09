const { readBlogs, postBlogs, deleteBlogs, editBlogs, searchBlogs, userBlogs } = require('../controllers/blogs.controllers');

const blogsRoutes = require('express').Router();


blogsRoutes.get("/read", readBlogs);
blogsRoutes.get("/search", searchBlogs);
blogsRoutes.get("/user", userBlogs)
blogsRoutes.post("/new", postBlogs);
blogsRoutes.delete("/remove/:id", deleteBlogs);
blogsRoutes.put("/edit/:id", editBlogs);


module.exports = blogsRoutes;