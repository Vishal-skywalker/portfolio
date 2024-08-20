public inherited sharing class Utility {

    public static final Map<Integer, String> MONTH_MAP = new Map<Integer, String>{
        1 => 'Jan',
        2 => 'Feb',
        3 => 'Mar',
        4 => 'Apr',
        5 => 'May',
        6 => 'Jun',
        7 => 'Jul',
        8 => 'Aug',
        9 => 'Sep',
        10 => 'Oct',
        11 => 'Nov',
        12 => 'Dec'
    };
    
    public static RestResponse sendSuccessResponse(String body) {
        RestResponse res = RestContext.response;
        res.responseBody = Blob.valueOf(body);
        res.statusCode = 200;
        res.addHeader('Content-Type','application/json');
        return res;
    }

    public static RestResponse sendErrorResponse(String message) {
        return sendErrorResponse(message, 500);
    }

    public static RestResponse sendErrorResponse(String message, Integer code) {
        RestResponse res = RestContext.response;
        res.responseBody = Blob.valueOf(message);
        res.statusCode = code;
        res.addHeader('Content-Type','application/json');
        return res;
    }

    public static String toMonthAndYear(Date d) {
        String dateString = '';
        if (d != null) {
            dateString = MONTH_MAP.get(d.month()) + ', ' + d.year();
        }
        return dateString;
    }
}