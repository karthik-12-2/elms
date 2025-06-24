const db = require('../config/db.js');

const login = (email, password, role) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM auth WHERE email = ? AND password = ? AND role = ?',
                  [email, password, role],
                  (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                  }
            );
      });
}

const createUser = (email, password, role) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'INSERT IGNORE INTO auth (email, password, role) VALUES (?, ?, ?)',
                  [email, password, role],
                  (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                  }
            )
      })
}

const getUserByEmail = (email) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM auth WHERE email = ?',
                  [email],
                  (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                  }
            );
      });
}

const updatePassword = (email, role, newpassword) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'UPDATE auth SET password = ? WHERE email = ? AND role = ?',
                  [newpassword, email, role],
                  (err, result) => {
                        if (err) return reject(err)
                        resolve(result)
                  }
            )
      })
}

const getUserNameByEmployeeEmail = (email) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT CONCAT(firstname, ' ', lastname) AS employeename, employeecode FROM employee WHERE email = ?`,
                  [email],
                  (err, result) => {
                        if (err) return reject(err)
                        resolve(result)
                  }
            )
      })
}

module.exports = { login, getUserByEmail, updatePassword, createUser, getUserNameByEmployeeEmail };