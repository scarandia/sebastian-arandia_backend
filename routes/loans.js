const express = require('express')
const router = express.Router()
const fs = require('fs');
const db = require('../db/Clientsdb.json');

/* Loans root routes all start with /client */
/* Show loans JSON FORMAT*/
router.route("/")
    .get((req, res) => {
        console.log("Showing loans")
    });

module.exports = router