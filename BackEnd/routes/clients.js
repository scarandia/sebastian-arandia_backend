const express = require('express')
const router = express.Router()
const fs = require('fs');
const db = require('../db/Clientsdb.json');

/* Clients root routes all start with /client */
/*Show clients JSON FORMAT*/
router.route("/")
    .get((req, res) => {
        console.log("Showing clients")
        fs.readFile('db/Clientsdb.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            // Parse the JSON data and send it as the response
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        });
    });
module.exports = router



router.get('/id', (req, res) => {
    const clientEmail = req.query.email;

    db.checkclientByEmail(clientEmail, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        res.json(result);
    });
});


/*Clients dynamic id routes and methods */
/* MUST SHOW ONLY USERS PREVIOUSLY CREATED 
router
    .route("/:client_id")
    .get((req, res) => {
        res.send(`Get client With ID ${req.params.client_id}`)
    })
    .put((req, res) => {
        res.send(`UPDATE client With ID ${req.params.client_id}`)
    })
    .delete((req, res) => {
        res.send(`DELETE client With ID ${req.params.client_id}`)
    })
*/


module.exports = router