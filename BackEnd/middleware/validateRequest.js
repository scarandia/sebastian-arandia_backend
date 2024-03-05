const Joi = require('joi');

const commonMessages = {
  email: {
    base: 'Invalid email format. Please provide a valid email address.',
    empty: 'Email is required.',
    required: 'Email is required.',
  },
  amount: {
    min: 'Amount must be at least 0.',
    max: 'Amount must not exceed 1000.',
    empty: 'Amount is required.',
    required: 'Amount is required.',
  },
};

const validator = (schema) => (req, res, next) => {
  const payload = req.body;
  const result = schema.validate(payload, { abortEarly: false });

  if (result.error) {
    const errorDetails = result.error.details.map(detail => ({
      message: detail.message,
      path: detail.path,
      type: detail.type,
    }));
    return res.status(400).json({ errors: errorDetails });
  }
  next();
};

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'unosquare'] }  // Add the top-level domains you want to allow
}).required().messages(commonMessages.email);

const amountSchema = Joi.number().min(0).max(1000).required().messages(commonMessages.amount);

const loanSchema = Joi.object({
  email: emailSchema.custom((value, helpers) => {
    if (typeof value !== 'string') {
      return helpers.message('Email must be a string.');
    }
    return value;
  }),
  amount: amountSchema,
});

const paymentSchema = Joi.object({
  email: emailSchema,
  amount: amountSchema,
});

module.exports = {
  validateLoan: validator(loanSchema),
  validatePayment: validator(paymentSchema),
};
