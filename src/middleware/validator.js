const Joi = require("joi")
const Responses = require('../responses/responses')
const responses = new Responses()

const validator = (schema) => (req, res, next) => {
    console.log(schema, req.body);
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      const errorMessage = validationResult.error.message;
      return responses.failResponses(res,errorMessage,validationResult)
    }
    next();
};

module.exports = validator
