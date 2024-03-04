const express = require("express");
const bodyParser = require('body-parser');
const { processLoan, processPayment } = require('./models/processPay.js');
const clientsRouter = require('./routes/clients');
//const loansRouter = require('./routes/loans');
//const paymentsRouter = require('./routes/payments');
//const { validatePayment, LoanValidator } = require("./middleware/validateRequest");
const expressValidator = require("express-validator");
const Joi = require("joi");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

//Validator Schemas

const loanSchema = Joi.object({
    email: Joi.string().email().required(),
    amount: Joi.number().min(0).max(1000).required(),
})

const paymentSchema = Joi.object({
    email: Joi.string().email().required(),
    amount: Joi.number().min(0).max(1000).required(),
})

/* If cases for schema validators */

app.post('/loans', processLoan, (req, res) => {
    const { error, value } = paymentSchema.validate(req.body)

    if (error) {
        console.log(error);
        return res.send("Invalid Request");
    }

    res.status(200).json({ message: 'Loan created' });
});

app.post('/payments', processPayment, (req, res) => {
    const { error, value } = paymentSchema.validate(req.body)

    if (error) {
        console.log(error);
        return res.send("Invalid Request");
    }

    res.status(200).json({ message: 'Payment received' });
});

app.use('/clients', clientsRouter);

app.use(bodyParser.json());

app.listen(PORT, () => console.log("Server Started on port " + PORT));

/*
app.post('/loans', LoanValidator, (req, res) => {
    res.status(200).json({ message: 'Loan processed' });
});
*/
//app.post('/payments', processPayment);