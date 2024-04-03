const path = require('path');
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
app.use(express.json());  // For body data: raw json
app.use(express.urlencoded({extended: false}));  // For url-encoded data

// Request path:  (Note: We specify the base URL path here)
// server -> goalRoutes -> goalControllers
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// ----------------------------------------
// Serve Frontend in PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));  // location of prod static assets
  app.get(
    '*',
    (req, res) => res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
// ----------------------------------------

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));



