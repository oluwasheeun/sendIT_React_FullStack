const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
// Load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

//Bodyparser middleware
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//enable cors
app.use(cors());

//Define Routes
app.use('/parcels', require('./routes/orders'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  // server.close(() => process.exit());
});
