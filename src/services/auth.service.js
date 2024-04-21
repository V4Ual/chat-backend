const jwt = require("jsonwebtoken");
const { unauthorized } = require("../responses/response");

const verifyAuthToken = (request) => {
  const authToken = request.headers.authorization;
  let verify = true;
  let message = "";

  if (!authToken) {
    verify = false;
    message = "token invalid";
    return { verify, message };
  }
  const part = authToken.split(" ");
  if (part.length != 2) {
    verify = false;
    message = "Token Error";
    return { verify, message };
  }
  const [scheme, token] = part;
  if (!/^Bearer$/i.test(scheme)) {
    verify = false;
    message = "Token malformatted";
    return { verify, message, token };
  }

  return { verify, message, token };
};

const authService = async (req, res, next) => {
  const { verify, message, token } = verifyAuthToken(req);
  if (verify) {
    await jwt.verify(
      token,
      process.env[process.env.ENV + "_JWT_TOKEN"],
      async (err, token) => {
        if (err) {
          throw err;
        }
        req.headers.userData = token;
        next();
      }
    );
  } else {
    return res.send(unauthorized("token invalidate"));
  }
};

module.exports = { authService };
