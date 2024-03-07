const express = require("express");
const bodyParser = require('body-parser');
const Joi = require("joi");
const { processLoan, processPayment } = require('./controllers/processPay');
const { clientsRouter } = require('../routes/clients');
const { homepageRouter } = require('../routes/homepage');

const app = express();
app.use(bodyParser.json());
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


app.use('/', homepageRouter);

app.use('/clients', clientsRouter);

app.post('/loans', processLoan);

app.post('/payments', processPayment);

app.use(bodyParser.json());

app.listen(PORT, () => console.log("Server Started on port " + PORT));
