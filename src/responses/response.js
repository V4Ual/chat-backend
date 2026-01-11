const successResponses = (msg, data) => {
  return {
    statusCode: 200,
    status: true,
    responseMessage: msg,
    data: data,
  };
};
const badRequest = (msg, data) => {
  return {
    statusCode: 400,
    responseMessage: msg,
    status: false,
    data: {},
  };
};
const unauthorized = (msg, data) => {
  return {
    statusCode: 401,
    message: msg,
    status: false,
    data: {},
  };
};
const notFoundResponses = (msg, data) => {
  return {
    statusCode: 404,
    message: msg,
    status: false,
    err: err,
  };
};
const duplicateResponses = (msg, data) => {
  return {
    statusCode: 409,
    message: msg,
    status: false,
    data: {},
  };
};

module.exports = {
  successResponses,
  badRequest,
  unauthorized,
  notFoundResponses,
  duplicateResponses,
};
