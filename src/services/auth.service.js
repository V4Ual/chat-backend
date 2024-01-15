const jwt = require("jsonwebtoken");
const Responses = require("../responses/responses");
const responses = new Responses();

const verifyAuthToken = (request) => {
  const authToken = request.headers.authorization;
  let verify = true;
  let message = "";

  if (!authToken) {
    verify = false;
    message = "token invalid";
  }
  const part = authToken.split(" ");
  console.log(part);
  if (part.length != 2) {
    verify = false;
    message = "Token Error";
    return { verify, message };
  }
  const [scheme, token] = part;
  console.log(token);
  if (!/^Bearer$/i.test(scheme)) {
    verify = false;
    message = "Token malformatted";
    return { verify, message, token };
  }

  return { verify, message, token };
};

const authService = async (req, res, next) => {
  try {
    const { verify, message, token } = verifyAuthToken(req);

    console.log({ verify, message, token });
    console.log("=====================secerte", process.env.JWT_TOKEN);
    if (verify) {
      const verifyUser = await jwt.verify(token, process.env.JWT_TOKEN);
      console.log(verifyUser);
      if (verifyUser) {
        next();
      } else {
        return responses.unauthorizedResponses(res, "User Not Authenticated");
      }
    }
  } catch (error) {
    return responses.unauthorizedResponses(res, "User Not Authenticated");
  }
};

module.exports = authService;
