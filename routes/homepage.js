const express = require('express')
const router = express.Router();
// Necessary functions or middleware

// Define the route
router.get('/', (req, res) => {
    console.log("Showing Webpage")
   
    res.send("Welcome to the Homepage")
});

module.exports = { homepageRouter: router };