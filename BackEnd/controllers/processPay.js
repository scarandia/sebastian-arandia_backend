const fs = require('fs');
const { loanSchema } = require('../middleware/validateRequest');

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
  // Validate the loan request using loanSchema
  const { error, value } = loanSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(err => err.message);
    return res.status(400).json({ errorCode: '104', messages: errorMessage });
  }

  const { email, amount } = req.body;
  const users = readDatabase();
  const user = users[email];

  if (!user || typeof user.debt !== 'number') {
    return res.status(400).json({ errorCode: '104', message: 'Invalid user data' });
  }

  let status = STATUS_OK;

  if (amount > 1000 || (user.debt + amount) > 1000) {
    status = STATUS_LOAN_EXCEEDED;
  }

  if (!user && amount > 50) {
    // New user, create a record
    return res.status(400).json({ errorCode: '101', message: 'First loan exceeded' });
  }

  if (!user && amount > 0) {
    users[email] = { debt: 0, loanId: 0 };
  }

  if (!user && amount < 0) {
    return res.status(400).json({ errorCode: '103', message: 'Loan amount invalid' });
  }

  if (status === STATUS_OK) {
    user.debt += amount;
    user.loanId += 1;
    writeDatabase(users);
    return res.status(201).json({ message: 'Loan accepted', loanId: user.loanId });
  }

  return res.json({ user, status });
}

function processPayment(req, res) {
  const { amount, email } = req.body;
  const users = readDatabase();

  if (!users[email]) {
    return res.status(400).json({ errorCode: '102', message: 'User not found or invalid' });
  }

  const user = users[email];

  if (typeof user.debt !== 'number') {
    return res.status(400).json({ errorCode: '103', message: 'Invalid user data' });
  }

  if (amount > user.debt) {
    return res.status(400).json({ errorCode: '100', message: 'Amount exceeds debt' });
  }

  user.debt -= amount;
  writeDatabase({ ...users, [email]: user });

  return res.status(201).json({ message: 'Payment accepted' });
}

module.exports = {
  processLoan,
  processPayment
};
