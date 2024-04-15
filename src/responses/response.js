const successResponses = (msg, data) => {
    return {
        statusCode: 200,
        responseMessage: msg,
        data: data,
    };
};
const badRequest = (msg, data) => {
    return {
        statusCode: 400,
        responseMessage: msg,
        data: {},
    };
};
const unauthorized = (msg, data) => {
    return {
        statusCode: 401,
        message: msg,
        data: {},
    };
};
const notFoundResponses = (msg, data) => {
    return {
        statusCode: 404,
        message: msg,
        err: err,
    };
};
const duplicateResponses = (msg, data) => {
    return {
        statusCode: 409,
        message: msg,
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
