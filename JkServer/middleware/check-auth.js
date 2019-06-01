const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports=(req,resp,next) => {

   
    try{

        const decoded = jwt.verify(req.body.token,process.env.jwt_key); ///jwt verification

        req.userdata = decoded;
        next();

    }
    catch{

    }
   


    

}