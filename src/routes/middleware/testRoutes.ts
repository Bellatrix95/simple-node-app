// middleware used for checking if route is used for tests 
export const tests = function (req, res, next) {
    const authHeader = req.headers.authorization ? req.headers.authorization : req.headers['token'];
    if (!authHeader) {
        return res.status(401).json({message: "Please send your test token!"});
    }

    const token = authHeader.split(' ')[1];
    if (token != "String token for tests") {
        return res.status(403).json({message: "Incorrect token!"});
    }
}