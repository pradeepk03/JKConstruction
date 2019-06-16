const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports=(req,resp,next) => {

   
    try{

        const token = req.headers.authorization.split(" ")[1]

      
        const decoded = jwt.verify(token,process.env.jwt_key); ///jwt verification

        req.userdata = decoded;
        next();

    }
    catch{

        return resp.status(401).json({"Msg":"Auth failed"})
    }
   


    

}