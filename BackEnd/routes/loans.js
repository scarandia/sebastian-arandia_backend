const express = require('express')
const router = express.Router()

// Necessary functions or middleware
const { processLoan } = require('../controllers/processPay.js');

// Define the routes for loans
router.post('/', processLoan);

module.exports = router