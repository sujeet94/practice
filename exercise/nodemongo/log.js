function logData(req, res, next) {
    console.log(`req is  ${req.body} ...`);
    next();
}
module.exports = logData;