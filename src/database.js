const mongoose = require('mongoose');
const URI_LOCAL = 'mongodb://localhost/springs';
const URI_REMOTE = 'mongodb+srv://elrodra:SpringDigital1@cluster0.firky.mongodb.net/springs?retryWrites=true&w=majority'

mongoose.connect(URI_REMOTE)
  .then(db => console.log('database is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;