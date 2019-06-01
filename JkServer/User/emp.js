let db = require("../db/db");
let pool = require("../db/db");
// To get details by employee id

exports.getempdetails = function(id, callback) {
  pool.getConnection(function(err, con) {
    let sql = `SELECT * FROM jkemployee WHERE emp_id = ?`;

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

// Get all users

exports.getallEmp = function(callback) {
  pool.getConnection(function(err, con) {
    let sql = `SELECT * FROM jkemployee `;

    con.query(sql, function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }

      con.release(); // database release
    });
  });
};

// Insert users

exports.insertEmp = function(data, callback) {



  pool.getConnection(function(err, con) {

    
     let sql = `insert into jkemployee set ?`;
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

exports.updateEmp = function(id, data, callback) {
 
  console.log("data"+JSON.stringify(data))

  pool.getConnection(function(err,con){

    let sql = `update jkemployee set FirstName = ? , LastName =? , AadharNo = ? ,usertype = ? , contactno = ? , site_working = ? , address = ? where emp_id = ?`;


    con.query(sql, [data.FirstName,data.LastName,data.AadharNo,data.usertype,data.contactno,data.site_working,data.address,id], function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
  
     con.release();
    });
  

  })
  //(Id,Name,Adress,MobileNo) values ('3','Prajwal','Mumbai','7303905930')

};

exports.deleteEmp = function(id, callback) {
 
  pool.getConnection(function(err,con){

    let sql = `DELETE from jkemployee  where emp_id = ?`;

    
  con.query(sql, [id], function(err, data, fields) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }

    con.release();
  });

  })

  //(Id,Name,Adress,MobileNo) values ('3','Prajwal','Mumbai','7303905930')

};

exports.insertEmpBulk = function(data, callback) {


  console.log("in insert bulk method")

  console.log(data)
  let val=[ [ 'Gaurav',
    'Singh',
    '3611',
    'A',
    '133',
    '4/21/2019 19:06',
    '4/21/2019 13:36',
    '9082618057',
    'Virar',
    'Nalasopara' ]]

  pool.getConnection(function(err, con) {

    
    // let sql = `insert into jkemployee set ?`;
   let sql = "insert into `jkemployee` (FirstName,LastName,AadharNo,usertype,emp_id,intime,outtime,contactno,site_working,address) values ?";

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

// To get all the employee details
/*let allusers = function() {
    db.query("SELECT * FROM employee_details ", function(err, result, fields) {
      if (err) throw err;
  
      console.log("result" + result[0].Name);
      resp.send("Hello " + JSON.stringify(result));
    });
  
    console.log("hello" + req);
  };
  */
