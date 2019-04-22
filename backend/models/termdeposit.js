const mongoose = require('mongoose');

const termDepositSchema = mongoose.Schema({
  depositNumber: { type: String, required: true },
  depositSum: { type: Number, required: true },
  depositInterest: { type: Number, required: true }
});

module.exports = mongoose.model('TermDeposit', termDepositSchema);
