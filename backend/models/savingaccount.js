const mongoose = require('mongoose');

const savingAccountSchema = mongoose.Schema({
  accountNumber: { type: String, required: true },
  accountSum: { type: Number, required: true },
  accountInterest: { type: Number, required: true }
});

module.exports = mongoose.model('SavingAccount', savingAccountSchema);
