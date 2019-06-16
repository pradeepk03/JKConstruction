let db = require("../db/db");
let pool = require("../db/db");
// To get details by employee id

exports.getworkdonebyemp = function(id, callback) {
  pool.getConnection(function(err, con) {
    let sql = `SELECT  s.emp_id,e.FirstName,e.LastName,e.usertype,e.AadharNo,s.workdone,s.date,s.site_working,s.supervisor_id  from jkemployee as e RIGHT JOIN emp_salary as s  on e.emp_id = s.emp_id WHERE s.emp_id=?`;

    con.query(sql, [id], function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }

      con.release(); // db release
    });
  });
};


exports.addempearnings = function(data, callback) {



    pool.getConnection(function(err, con) {
  
      
       let sql = `insert into emp_sal set ?`;
     // let sql = "insert into `jkemployee` (FirstName,LastName,AadharNo,usertype,emp_id,intime,outtime,contactno,site_working,address) values ?";
  
      con.query(sql, [data], function(err, data, fields) {
        if (err) {
          callback(err);
        } else {
          
          callback(null, data);
        }
  
        con.release();
      });
    });
  };


// exports.updateearnings = function(id, callback) { // update earnings
   
    
//   pool.getConnection(function(err,con){

//     let sql = `update emp_salary set workdone = ? , date =? , AadharNo = ? ,usertype = ? , contactno = ? , site_working = ? , address = ? where emp_id = ?`;


//     con.query(sql, [data.FirstName,data.LastName,data.AadharNo,data.usertype,data.contactno,data.site_working,data.address,id], function(err, data, fields) {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, data);
//       }
  
//      con.release();
//     });
  

//   })


//   };