const express = require("express");
const mysql = require("mysql");
const cors = require('cors')
const path = require('path');
const bodyparser = require("body-parser");
const user = require("./User/user")   // Files imported locally
const emp = require("./User/emp")   // Files imported locallyy
require('dotenv/config');
const db = require("./db/db") // Files imported locally
const router = express.Router();
const app = express();//Express code
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const checkauth = require('./middleware/check-auth') //for hash pwd





//router.use(bodyparser.json());
//router.use(bodyparser.urlencoded({extended:true}));
//app.use(bodyparser.json());

// using cors for cross origin request
app.use(cors());

//Set static folder angular
app.use(express.static(__dirname+"/dist/JkAdmin"));

//app.use(bodyparser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT, (req,res) => {
  console.log("Server started on "+process.env.PORT);

  
});


//CRUD operations For Employees------>

app.get("/api/getemp", function(req, resp) {

  


  try {
    emp.getallEmp( function(err, data) {
      if (err) {
        resp.status(500).send(err);
      } else {
        resp.status(200).send(data);
      }
    });
  } catch (error) {}



});

app.get("/api/getempbyid/:id", function(req, resp) {

  
  
  try {
    emp.getempdetails(req.params.id, function(err, data) {

      

      if (err) {
        resp.status(500).send(err);
      } else {
        resp.status(200).send(data);
      }
    });
  } catch (error) {}
});





/*  Post
app.post("/api/saveuser", function(req, resp) {
    try {
      user.insertUser(req.body, function(err, data) {
        if (err) {
          resp.status(500).send(err);
        } else {

            user.getuserdetails(data.insertId,function(err,data){

                if(err){
                    resp.status(500).send(err);
                }
                else{
                    resp.status(200).send(data);
                }
            })

          //resp.status(200).send(data);
        }
      });
    } catch (error) {

        resp.status(500)

    }
  });
  
*/

// create application/json parser
//var jsonParser = bodyParser.json()

/*************************************   APi registeration tested  ******************************************************* */


app.post("/api/saveemployees", function(req, resp) {


  

    emp.insertEmp(req.body, function(err, data) {
      if (err) {

        resp.status(500).send(err);
      
      } else {

        resp.status(200).send({"Msgcode":"100","Msg":"Employee sucessfully updated"});

      }})
    //resp.send(req.body); 

});


 app.put("/api/updateemp/:id",function(req,resp){

  console.log("in update emp method"+req.params.id)

  try {
        emp.updateEmp(req.params.id,req.body, function(err, data) {
          if (err) {
            resp.status(500).send(err);
          } else {
  
            resp.status(200).send({"Msgcode":"110","Msg":"Employee Updated Successfully"})

                      }
        });
      } catch (error) {
  
          resp.status(500)
  
      }

}) 

 //Delete all employees
 
 app.delete("/api/deleteemp/:id",function(req,resp){

  console.log(req.params.id)


  try {
      emp.deleteEmp(req.params.id, function(err, data) {

        console.log(JSON.stringify(data))

        if (err) {
          resp.status(500).send(err);
        } else {

          resp.status(200).send({"Msgcode":"120","Msg":"Employee Deleted Successfully"})

                    }
      });
    } catch (error) {

        resp.status(500)

    }


}) 


///************************** For all the users crud *********************************** */

app.post("/api/saveuser", function(req, resp) {

  

  bcrypt.hash(req.body.password, salt, function(err, hash) {
    // Store hash in your password DB.
    console.log("hash"+hash)

    user.insertUser({"emp_id":req.body.emp_id,"username":req.body.username,"password":hash,"usertype":req.body.usertype}, function(err, data) {
      if (err) {
  
        resp.status(500).send({"Msgcode":'101',"Msg":err});
      
      } else {
  
  
        resp.status(200).send({"Msgcode":"100","Msg":"User Updated Successfully"})
  
      }})
    //resp.send(req.body); 
  });

  
});

/************************************ All users api   ************************************** */

app.post("/api/login", function(req, resp) {

   user.getusers(req.body.emp_id, function(err, data) {


      console.log(req.body.username+"username pass"+req.body.password)

      if (err) {
  
        resp.status(500).send({"Msgcode":'101',"Msg":err}); //If api call fails with some reason
      
      } else {

        if(data.length < 1)
        {
          return resp.status(401).send({"Msgcode":'102',"Msg":"User Not Found"}) // if username sent is not found 
        }
        else{

          bcrypt.compare(req.body.password,data[0].password,(err,result) =>{

            console.log(result)

            if(err)
            {
              
              return resp.status(401).json({"Msgcode":'101',"Msg":err}) // if password sent is not matached
            }

           if(result){

            console.log(result)

            console.log(data[0].username)

            console.log(req.body.username)

            if(data[0].username.toLowerCase() != req.body.username.toLowerCase() )
              return resp.status(401).json({"Msgcode":"101","Msg":"User Details dont match"})

             //create json web token
             const token = jwt.sign({

                  username: data[0].username,
                  id: data[0].emp_id

             },process.env.jwt_key,{

                  expiresIn:"1h"

             })

             return resp.status(200).json({"Msgcode":"103","userdata":data[0],"Msg":"Login success","token":token})
           }  

           resp.status(200).json({"Msgcode":"104","Msg":"Passowrd Incorrect"})

          })

        }
  
  
      }})
    //resp.send(req.body); 
  
  
});

// delete user

app.delete("/api/deleteusers/:id",function(req,resp){

  console.log("in delete users"+req.params.id)

  try {
      user.deleteUserdata(req.params.id, function(err, data) {
        if (err) {
          resp.status(500).send(err);
        } else {

          resp.status(200).send({"Msgcode":"120","Msg":"User Deleted Successfully"})

                    }
      });
    } catch (error) {

        resp.status(500)

    }


}) 



app.get('/*',(req,res) => res.sendFile(path.join(__dirname,'/dist/JkAdmin/index.html')));
