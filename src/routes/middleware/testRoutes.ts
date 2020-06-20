// middleware used for checking if route is used for tests 
export const tests = function (req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization : req.headers['token'];
    if (!token) {
        return res.status(401).json({message: "Please send your test token!"});
    }
    if (token != "String token for tests") {
        return res.status(403).json({message: "Incorrect token!"});
    }
    next();
}