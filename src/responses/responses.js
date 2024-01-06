class Responses {
    successResponses = (res,msg,data,create) =>{
        res.json({
            statusCode:create ? 201 : 200,
            message:msg,
            data:data,
        })
    }
    failResponses = (res,msg,err) =>{
        res.json({
            statusCode:500,
            message:msg,
            err:err
        })
    }
    unauthorizedResponses = (res,msg,err) =>{
        res.json({
            statusCode:401,
            message:msg,
            err:err
        })
    }
    notFoundResponses = (res,msg,err) =>{
        res.json({
            statusCode:401,
            message:msg,
            err:err
        })
    }
}

module.exports = Responses

