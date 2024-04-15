const Joi = require("joi");
const { badRequest } = require("../responses/response");


const validator = (schema) => (req, res, next) => {
    console.log(schema, req.body);
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      const errorMessage = validationResult.error.message;
      return badRequest(res, errorMessage, validationResult)
    }
    next();
};

module.exports = validator
