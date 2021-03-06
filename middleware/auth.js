const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    // Get the token from th header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token){
        return res.status(401).json({errors:[{message:'No token, autharization denide'}]});
    }
    // Verify token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({errors:[{message:'Token is not valid!'}]});
    }
}