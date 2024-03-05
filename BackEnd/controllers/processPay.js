const fs = require('fs');

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

/*
function createUserIfNotExists(email, amount) {
  const users = readDatabase();
  if (users[email]) {
    return users
  }
  if (amount <= 50 && amount > 0) {
    users[email] = { debt: 0, loanId: 0 };  // Create a new user
    return users;
  }

  return null;
}
*/

/*
const STATUS_OK = 'ok'
const STATUS_LOAN_EXCEEDED = 'loan_exceeded'

function createNewLoan(user, amount) {
  let status = STATUS_OK;

  if (!user || typeof user.debt !== 'number') {
    return { user, status: 'invalid_user' };
  }

  if (amount > 1000 || (user.debt + amount) > 1000) {
    status = STATUS_LOAN_EXCEEDED;
  }

  if (status === STATUS_OK) {
    user.debt += amount;
  }

  return { user, status };
}
*/

function processLoan(req, res) {
  console.log('process loan', req)
  const { email, amount } = req.body;
  const users = readDatabase();

  if (!users[email] && amount > 50) {
    // New user, create a record
    return res.status(400).json({ errorCode: '101', message: 'First loan exceeded' });
  }
  if (!users[email] && amount > 0) {
    users[email] = { debt: 0, loanId: 0 };
  }
  if (!users[email] && amount < 0) {
    return res.status(400).json({ errorCode: '103', message: 'Loan amount invalid' });
  }

  const user = users[email];

  if (amount > 1000 || user.debt + amount > 1000) {
    return res.status(400).json({ errorCode: '100', message: 'Loan Amount exceeded' });
  }

  // Accept the loan
  user.debt += amount;
  user.loanId += 1;

  writeDatabase(users);

  res.status(201).json({ message: 'Loan accepted', loanId: user.loanId });
}

function processPayment(req, res) {
  const { amount, email } = req.body;
  const users = readDatabase();

  if (!users[email]) {
    return res.status(400).json({ errorCode: '102', message: 'User not found or invalid' });
  }

  const user = users[email];

  // Check if the user is invalid
  if (typeof user.debt !== 'number') {
    return res.status(400).json({ errorCode: '103', message: 'Invalid user data' });
  }

  // Check if the payment amount exceeds the debt
  if (amount > user.debt) {
    return res.status(400).json({ errorCode: '100', message: 'Amount exceeds debt' });
  }

  // Deduct the payment amount
  user.debt -= amount;

  // Update the specific user in the users object
  writeDatabase({ ...users, [email]: user });

  res.status(201).json({ message: 'Payment accepted' });
}




module.exports = { processLoan, processPayment };

