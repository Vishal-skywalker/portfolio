public inherited sharing class Utility {
    public static RestResponse sendSuccessResponse(String body) {
        RestResponse res = RestContext.response;
        res.responseBody = Blob.valueOf(body);
        res.statusCode = 200;
        res.addHeader('Content-Type','application/json');
        return res;
    }

    public static RestResponse sendErrorResponse(String message) {
        RestResponse res = RestContext.response;
        res.responseBody = Blob.valueOf(message);
        res.statusCode = 500;
        res.addHeader('Content-Type','application/json');
        return res;
    }
}