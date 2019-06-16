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
