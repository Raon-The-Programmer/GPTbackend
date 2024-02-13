const { COOKIE_NAME, JWT_SECRET } = require("./config")
const jwt = require('jsonwebtoken')

const middlewares ={
    verifyToken:async(req,res,next)=>{
        try{
            const token = req.signedCookies[`${COOKIE_NAME}`]
            if (!token || token.trim() === "") {
                return res.status(401).json({ message: "Token Not Received" });
              }
              const jwtData = jwt.verify(token, JWT_SECRET);
              res.locals.jwtData = jwtData;
              return next();
        }
        catch(err){
            return res.status(401).json({ message: "Token Expired" });        }
    }
}


module.exports = middlewares
