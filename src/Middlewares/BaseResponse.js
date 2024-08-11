export default function setBaseResponse(req, res, next) {
    res.setHeader('Content-Type','application/json');
    return next();
}