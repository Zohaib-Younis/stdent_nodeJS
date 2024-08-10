const express = require('express');
const app = express();
const passport=require('./auth')
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./modules/student'); // Make sure the path is correct

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Middleware for logging requests
const middleware = (req, res, next) => {
    console.log(`[${new Date().toString()}] Request made to: ${req.originalUrl}`);
    next();
};

// Initialize Passport
app.use(passport.initialize());

const localAutMiddleware=passport.authenticate('local',({session:false}));




// Database connection (make sure db.js is correct)
const db = require('./db');

// Middleware for logging requests
app.use(middleware);

// Route to authenticate and respond
app.get('/', localAutMiddleware, (req, res) => {
    res.send("Welcome to student information portal.");
});

// Student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/student',localAutMiddleware, studentRoutes);

// Parent routes
const parentRoutes = require('./routes/parentsRoutes');
app.use('/parent', parentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
});
