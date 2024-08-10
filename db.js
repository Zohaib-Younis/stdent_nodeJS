const mongoose = require('mongoose');
require('dotenv').config();

// Ensure the DB_URL is defined

// const mongooseURL='mongodb://localhost:27017';

const mongooseURL = process.env.DB_URL_LOCAL;

if (!mongooseURL) {
    throw new Error('DB_URL is not defined in the environment variables');
}

// Setup MongoDB connection
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Listen to events on the MongoDB connection
db.on('connected', () => {
    console.log("MongoDB server is successfully connected");
});

db.on('disconnected', () => {
    console.log("MongoDB server is successfully disconnected");
});

db.on('error', (error) => {
    console.log("Internal server error occurred while connecting to MongoDB server:", error);
});

// Default event listener for MongoDB connection
db.on('open', () => {
    console.log("MongoDB connection is open");
});
