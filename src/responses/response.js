const successResponses = (msg, data) => {
    return {
        statusCode: 200,
        responseMessage: msg,
        data: data,
    };
};
const failResponses = (msg, data) => {
    return {
        statusCode: 500,
        responseMessage: msg,
        data: {},
    };
};
const unauthorizedResponses = (msg, data) => {
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
    failResponses,
    unauthorizedResponses,
    notFoundResponses,
    duplicateResponses,
};
