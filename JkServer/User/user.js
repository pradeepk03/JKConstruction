let db = require("../db/db");
let pool = require("../db/db");
// To get details by employee id

exports.getusers = function(id, callback) {
  pool.getConnection(function(err, con) {
    let sql = `SELECT * FROM jk_users WHERE emp_id = ?` ;

    con.query(sql, [id], function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }

      con.release();
    });
  });
};

// Get all users

exports.getallUsers = function(callback) {
  pool.getConnection(function(err, con) {
    let sql = `SELECT * FROM jk_users `;

    con.query(sql, function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }

      con.release();
    });
  });
};

// Insert users

exports.insertUser = function(data, callback) {
  pool.getConnection(function(err, con) {
    let sql = `insert into jk_users set ?`;

    //(Id,Name,Adress,MobileNo) values ('3','Prajwal','Mumbai','7303905930')

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

exports.deleteUserdata = function(id, callback) {
  console.log("params id" + id);

  pool.getConnection(function(err, con) {
    let sql = `DELETE from jk_users  where emp_id = ?`;

    //(Id,Name,Adress,MobileNo) values ('3','Prajwal','Mumbai','7303905930')

    con.query(sql, [id], function(err, data, fields) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }

      con.release();
    });
  });
};
