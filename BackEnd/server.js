const express = require("express");
const bodyParser = require('body-parser');
const { processLoan, processPayment } = require('./controllers/processPay.js');
const clientsRouter = require('./routes/clients');
//const loansRouter = require('./routes/loans');
//const paymentsRouter = require('./routes/payments');
const Joi = require("joi");
const validateRequest = require("./middleware/validateRequest.js");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

/* routes and importing functions */

app.post('/loans', validateRequest.validateLoan, (req, res) => {
    const { error, value } = processLoan(req, res);

    if (error) {
        console.log(error);
        return res.status(400).send('ERROR');
    }

    res.status(200).json({ message: 'Loan created' });
});

app.post('/payments', validateRequest.validatePayment, (req, res) => {
    const { error, value } = processPayment(req, res);

    if (error) {
        console.log(error);
        return res.status(400).send('ERROR');
    }

    res.status(200).json({ message: 'Payment processed' });
});

app.use('/clients', clientsRouter);

app.use(bodyParser.json());
app.listen(PORT, () => console.log("Server Started on port " + PORT)); 