const express = require('express')
const router = express.Router()

// Necessary functions or middleware
const { processPayment } = require('../controllers/processPay.js');

// Define the routes for loans
router.post('/', processPayment);

module.exports = router