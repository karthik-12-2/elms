const db = require('../config/db.js');
const applyLeaveByEmployee = (from, to, leavetype, description, email) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'INSERT INTO leaves (leavetype, `from`, `to`, description, adminremark, status, email, adminactiontakendate) VALUES (?, ?, ?, ?,? ,?, ?,?)',
                  [leavetype, from, to, description, 'waiting for approval', 'waiting for approval', email, null],
                  (err, result) => {
                        if (err) {
                              reject(err)
                        } else {
                              resolve(result)
                        }
                  }
            )
      })
}

const fetchLeaveByEmployee = (email) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM leaves WHERE email = ?',
                  [email],
                  (err, result) => {
                        if (err) {
                              reject(err)
                        } else {
                              resolve(result)
                        }
                  }
            )
      })
}

const fetchLeaveDetailsByEmplyeeId = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, CONCAT(e.firstname, ' ', e.lastname ) AS employeename, e.employeecode, e.mobilenumber, e.gender
                  FROM leaves l
                  JOIN employee e ON l.email = e.email
                  WHERE l.id = ?`,
                  [id],
                  (err, result) => {
                        if (err) {
                              reject(err)
                        } else {
                              resolve(result)
                        }
                  }
            )
      })
}

const updateLeaveForTheEmployee = (id, leavestatus, adminremark) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `UPDATE leaves SET status=? , adminremark= ?, adminactiontakendate= Now() WHERE id=?`,
                  [leavestatus, adminremark, id],
                  (err, result) => {
                        if (err) {
                              reject(err)
                        } else {
                              resolve(result)
                        }
                  }
            )
      })
}

module.exports = { applyLeaveByEmployee, fetchLeaveByEmployee, fetchLeaveDetailsByEmplyeeId, updateLeaveForTheEmployee }