const Joi = require("joi");
const userValidation = {
  userCreate: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().error(new Error("Please provide a valid name between 3 and 30 characters.")),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required()
      .error(new Error("Please provide a valid email address.")),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .message(
        "Password must be at least 8 characters long and include at least one alphabet character, one digit, and one special symbol (@$!%*?&)."
      ),
    phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required().error(new Error("Please provide a valid 10-digit phone number.")),
    confirmPassword: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .message(
        "Password must be at least 8 characters long and include at least one alphabet character, one digit, and one special symbol (@$!%*?&)."
      ),
  }),
};

module.exports = userValidation;
