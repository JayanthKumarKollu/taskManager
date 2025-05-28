require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    // const token = req.headers['Authorization'];
    const token = req.get('Authorization')

    if(!token){
       return req.status(401).json("Not toke found, access denied")
    }else{
        try {
            const decode = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY);
            req.user = decode;
            next();
        } catch (error) {
            res.status(401).json("token is invalid.")
        }
    }
}

module.exports=authenticate;