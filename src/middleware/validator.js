const Joi = require("joi");
const { badRequest } = require("../responses/response");

const validator = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.message;
    return badRequest(res, errorMessage, validationResult);
  }
  next();
};

module.exports = validator;
