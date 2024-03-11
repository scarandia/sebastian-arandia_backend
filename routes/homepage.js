const express = require('express')
const router = express.Router();
// Define the route
router.route('/')
    .get((req, res) => {
        console.log("Showing Webpage")

        res.send("Welcome to the Homepage")
    });

module.exports = router;
   