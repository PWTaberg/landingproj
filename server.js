const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

// Security stuff
// Injection in mongoDB
//const mongoSanitize = require('express-mongo-sanitize');

// Setting security HTTP headers
const helmet = require('helmet');
// Prevent XSS atacks, cross site scripting
const xss = require('xss-clean');
// Used for limiting repeated requests
const rateLimit = require('express-rate-limit');
// protect against HTTP polution attacks
const hpp = require('hpp');
// Enable CORS
const cors = require('cors');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Prevent XSS - cross site scripting
app.use(xss());

// Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http parameter pollusion
app.use(hpp());

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

// Serve static assets in production
app.use(express.static('client'));
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
*/

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
