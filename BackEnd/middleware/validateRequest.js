const Joi = require("joi");

const emailConstraints = {
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] }
};

const loanSchema = Joi.object({
  email: Joi.string().email(emailConstraints).required().messages({
    'string.email': 'Invalid email format. Must have valid domain.',
    'any.required': 'Email is required.'
  }),
  amount: Joi.number().min(0).max(1000).required().messages({
    'number.min': 'Amount must be greater than or equal to 0.',
    'number.max': 'Amount must be less than or equal to 1000.',
    'any.required': 'Amount is required.'
  }),
}).options({ abortEarly: false }); // Allow all validation errors to be returned

const paymentSchema = Joi.object({
  email: Joi.string().email(emailConstraints).required().messages({
    'string.email': 'Invalid email format. Must have valid domain.',
    'any.required': 'Email is required.'
  }),
  amount: Joi.number().min(0).max(1000).required().messages({
    'number.min': 'Amount must be greater than or equal to 0.',
    'number.max': 'Amount must be less than or equal to 1000.',
    'any.required': 'Amount is required.'
  }),
}).options({ abortEarly: false }); // Allow all validation errors to be returned

module.exports = { loanSchema, paymentSchema };
