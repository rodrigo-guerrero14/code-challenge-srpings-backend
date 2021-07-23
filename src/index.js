const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

const {mongoose} = require('./database');

// Settings
app.set('PORT', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Springs Digital code challenge - Backend </h1>')
});
app.use('/api',require('./routes/payment.routes'));

// Starting the server
app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
});