const express = require("express");
const bodyParser = require('body-parser');
const { processLoan, processPayment } = require('./models/processPay.js');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());

app.post('/loans', processLoan);
app.post('/payments', processPayment);
app.use('/clients', clientsRouter);

app.listen(PORT, () => console.log("Server Started on port " + PORT));
