const Joi = require('joi');

// Errors
const {InvalidRequestError} = require('../util/customErrors');

// Predefined validation fields
const username = Joi.string().required();
const password = Joi.string().min(8).max(20).required();

// Error handling
const handleError = async (schema, req, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(new InvalidRequestError(err.message));
  }
};

const registrationValidator = async (req, res, next) => {
  const schema = Joi.object({
    username,
    password,
  });

  await handleError(schema, req, next);
};

const loginValidator = async (req, res, next) => {
  const schema = Joi.object({
    username,
    password,
  });

  await handleError(schema, req, next);
};

module.exports = {
  registrationValidator,
  loginValidator,
};
