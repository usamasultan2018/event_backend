const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL.
const mongoUrl = process.env.MONGODB_URL_LOCAL;

// Set up MongoDB connection with options
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Get the default connection
const db = mongoose.connection;

// Define event Listeners for database connection.
db.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});

db.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

// Exporting the database connection.
module.exports = db;
