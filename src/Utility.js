export function methodNotAllowed(res, methodName) {
    return res.status(STATUS_CODES.METHOD_NOT_ALLOWED).json({message: `${methodName} is not Allowed on this Route`}).end();
}

export function checkRequiredParams(requiredParams, params, res) {
    const missingParams = []
    requiredParams.forEach(e => {
        if (!params[e]) {
            missingParams.push(e)
        }
    });
    if (missingParams.length > 0) {
        res.status(STATUS_CODES.BAD_REQUEST).json({message: `Required Parameter missing in the body or search quary [ ${missingParams.join(', ')} ]`}).end();
        return false
    }
    return true
}

export function sendErrorResponse(error, res, status) {
    res.status(status).json({message: error?.toString(), error_code: status}).end();
}

export const STATUS_CODES = {
    SUCCESS : 200,
    CREATED : 201,
    BAD_REQUEST : 400,
    UNAUTHERIZED : 401,
    FORBIDDEB : 403,
    NOT_FOUND : 404,
    METHOD_NOT_ALLOWED : 405,
    UNEXPECTED : 500,
}