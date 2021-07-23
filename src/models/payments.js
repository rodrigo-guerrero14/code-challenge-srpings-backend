const mongoose = require('mongoose');
const moment = require('moment')
const { Schema } = mongoose;

const paymentSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  description: {type: String, required: true},
  serviceHour: {type: Number, required: true},
  amountOfService: {type: Number, required: false},
  date: {type: String, required: true, default: moment().format('DD-MM-YYYY')},
  dayAmountUf: {type: Number, required: true}
})

module.exports = mongoose.model('Payment', paymentSchema);