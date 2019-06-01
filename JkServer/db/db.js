const mysql = require("mysql");

// Ceate db conncetion
function get_connection(){

  return mysql.createConnection({

   
    host: "localhost",
    user: "root",
    password: "",
    database: "employees"


  })
}

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "employees"
});


pool.getConnection(function(err,conncetion)
{
    if(err)
    console.log(err)
    else{

      console.log("Database connected");
    // db.releaseConnection();
    }
    

})

//Check connection

// db.connect(function(error) {
//   if (!!error) {
//     console.log("error");
//   } else {
//     console.log(" Database Connected");
//   }
// });



module.exports = pool;