class Responses {
    successResponses = (res,msg,data,create) =>{
        res.status(create ? 201 : 200,).json({
            statusCode:create ? 201 : 200,
            message:msg,
            data:data,
        })
    }
    failResponses = (res,msg,err) =>{
        res.status(500).json({
            statusCode:500,
            message:msg,
            data: err

        })
    }
    unauthorizedResponses = async (res, msg, err) => {
        res.status(401).json({
            statusCode:401,
            message:msg,
            data: {}
        })
    }
    notFoundResponses = (res,msg,err) =>{
        res.status(404).json({
            statusCode: 404,
            message: msg,
            err: err
        })
    }
    duplicateResponses = (res, msg, err) => {
        res.status(409).json({
            statusCode: 409,
            message:msg,
            data: {}
        })
    }
}

module.exports = Responses

