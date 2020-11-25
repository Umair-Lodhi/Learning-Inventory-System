const jwt = require('jsonwebtoken')
const config = require('config');

module.exports = function (req, res, next) {
    
    const token = req.header('x-auth-token');
    if(!token) return res.status(501).send({
        status: '401 Unauthorized',
        errorMessage:"Access denied..No token Provided" 
    });

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();

    } catch (ex) {
        res.status(400).send({status: '400 Bad Request',errorMessage:"Invalid Token" });
    }
}
