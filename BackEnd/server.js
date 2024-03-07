const express = require("express");
const bodyParser = require('body-parser');
const Joi = require("joi");
const { processLoan, processPayment, readNewClients } = require('./controllers/processPay');
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

/* Available Routs */

app.use('/', homepageRouter);

app.use('/clients', clientsRouter, readNewClients);

app.post('/loans', processLoan);

app.post('/payments', processPayment);

//app.use('/newClients', readNewClients);

app.use(bodyParser.json());

app.listen(PORT, () => console.log("Server Started on port " + PORT));
