const fs = require('fs');
const { loanSchema, paymentSchema } = require('../middleware/validateRequest');

function readDatabase() {
  try {
    const data = fs.readFileSync('db/debts.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {};
  }
}

function writeDatabase(users) {
  try {
    fs.writeFileSync('db/debts.json', JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database:', error);
  }
}

const STATUS_OK = 'ok';
const STATUS_LOAN_EXCEEDED = 'loan_exceeded';

function processLoan(req, res) {
  const { email, amount } = req.body;
  const users = readDatabase();

  const { error, value } = loanSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(err => err.message);
    return res.status(400).json({ errorCode: '104', messages: errorMessage });
  }

  let status = STATUS_OK;

  // Rest of your logic for processing loans...
}

function processPayment(req, res) {
  const { amount, email } = req.body;
  const users = readDatabase();

  const { error, value } = paymentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(err => err.message);
    return res.status(400).json({ errorCode: '104', messages: errorMessage });
  }

  // Rest of your logic for processing payments...
}

module.exports = { processLoan, processPayment };
