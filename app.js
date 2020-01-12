const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const MongoClient = require('mongodb').MongoClient;

// Connect to local database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// On connected
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', err => {
  console.log('database error' + err);
});

const app = express();

const port = process.env.PORT || 3000;

const users = require('./routes/users');

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Passport Middelware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hey there');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
