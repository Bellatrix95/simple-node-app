import jwt from 'jsonwebtoken';

export const auth = function (req, res, next) {
    const authHeader = req.headers.authorization ? req.headers.authorization : req.headers['token'];
    if (!authHeader) {
        return res.status(401).json({message: "Please send your authentication token!"});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'shoppingListApplicationToken', (err, data) => {
        if (err) {
            return res.status(403).json({message: "Incorrect token!"});
        }
        req.decoded = data;
        next();
    });
}

export const generateToken = function(data) {
    return jwt.sign(data, 'shoppingListApplicationToken');
}