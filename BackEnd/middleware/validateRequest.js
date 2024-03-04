/*
const { Validator } = require('express-validator');
const { validate } = new Validator({ allErrors: true });
*/
/* JSON schema for payment. */
const paymentSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
    },
    amount: {
      type: 'integer',
      minimum: 1,
      maximum: 1000,
    },
  },
  required: ['email', 'amount'],
  additionalProperties: false,
};

/* JSON schema for loan. */
const loanSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
    },
    amount: {
      type: 'integer',
      minimum: 1,
      maximum: 1000,
    },
  },
  required: ['email', 'amount'],
  additionalProperties: false,
};

const validatePayment = validate({ body: paymentSchema });
const LoanValidator = validate({ body: loanSchema });

module.exports = { validatePayment, LoanValidator };
