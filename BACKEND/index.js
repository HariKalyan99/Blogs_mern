require('dotenv').config();
const port = 8081;
const cors = require('cors');
const express = require('express');
const mongoUrl = process.env.MONGODB_URI;
const mongoose = require('mongoose');
const blogsRoutes = require('./routes/blogs.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blogs", blogsRoutes);


mongoose.connect(mongoUrl).then(() => {
    console.log("Successfully connected to the mongo DB");
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
}).catch(error => console.log("Connection unsuccessfull", error))

