const express = require('express');  // Backend web framework
const colors = require('colors');
const dotenv = require('dotenv').config();  // Use environment vars
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');  // import db connection
const port = process.env.PORT || 5000;  // Run server on port in .env, default 5000

// Run our DB
connectDB();

const app = express();  // Initialize express

// Add middleware to handle body and url-encoded data
app.use(express.json())  // For body data: raw json
app.use(express.urlencoded({extended: false}))  // For url-encoded data

// Request path:  (Note: We specify the base URL path here)
// server -> goalRoutes -> goalControllers
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));



