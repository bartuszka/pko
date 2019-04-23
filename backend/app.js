const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const SavingAccount = require('./models/savingaccount');
const TermDeposit = require('./models/termDeposit');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://bart:17w61obcKTxfThfV@cluster0-g0mzn.mongodb.net/appData?retryWrites=true', { useNewUrlParser: true })
.then(
  () => {
    console.log('Connected to database!');
  }
)
.catch(
  () => {
    console.log('Connection to database failed!');
  }
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE'
  )
  next();
});

app.get('/application/init', (req, res, next) => {
  res.status(200).json({
    init: true
  })
});

app.get('/application/currentAccounts', (req, res, next) => {
  SavingAccount.find().then(
    (accounts) => {
      res.status(200).json({
        message: 'Accounts fetched successfully!',
        savingAccounts: accounts
      })
    }
  );
});

app.get('/application/termDeposits', (req, res, next) => {
  TermDeposit.find().then(
    (deposits) => {
      res.status(200).json({
        message: 'Deposits fetched successfully!',
        currentDeposits: deposits
      })
    }
  )
});

app.get('/application/currentAccounts/:id', (req, res, next) => {
  SavingAccount.findOne({_id: req.params.id}).then(
    (account) => {
      return res.status(200).json({account: account});
    }
  ).catch(
    (error) => {
      return res.status(404).end();
    }
  );
});

app.get('/application/termDeposits/:id', (req, res, next) => {
  TermDeposit.findOne({_id: req.params.id}).then(
    (deposit) => {
      return res.status(200).json({deposit: deposit});
    }
  ).catch(
    (error) => {
      return res.status(404).end();
    }
  );;
});

app.post('/application/currentAccounts', (req, res, next) => {

  const savingAccount = new SavingAccount({
    accountNumber: req.body.accountNumber,
    accountSum: req.body.accountSum,
    accountInterest: req.body.accountInterest
  });
  savingAccount.save().then(
    createdAccount => {
      res.status(201).json({
        message: 'Data added successfully',
        accountId: createdAccount._id
      })
    }
  );
});

app.post('/application/termDeposits', (req, res, next) => {

  const termDeposit = new TermDeposit({
    depositNumber: req.body.depositNumber,
    depositSum: req.body.depositSum,
    depositInterest: req.body.depositInterest
  });
  termDeposit.save().then(
    createdDeposit => {
      res.status(201).json({
        message: 'Data added successfully',
        depositId: createdDeposit._id
      })
    }
  );
});

app.delete('/application/currentAccounts/:id', (req, res, next) => {
  SavingAccount.deleteOne({_id: req.params.id}).then(
    (result) => {
      res.status(200).json({message: 'Post deleted!'});
    }
  );
});

app.delete('/application/termDeposits/:id', (req, res, next) => {
  TermDeposit.deleteOne({_id: req.params.id}).then(
    (result) => {
      res.status(200).json({message: 'Deposit deleted!'});
    }
  );
});

module.exports = app;
