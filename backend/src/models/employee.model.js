const db = require('../config/db.js');

const createEmployee = (empcode, gender, birthdate, firstname, lastname, deparment, country, email, city, address, mobilenumber, status) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `INSERT INTO employee (employeecode, gender, birthdate, firstname, lastname, department, country, email, city, address, mobilenumber, status)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                  [empcode, gender, birthdate, firstname, lastname, deparment, country, email, city, address, mobilenumber, status],
                  (err, result) => {
                        if (err) {
                              return reject(err)
                        } else {
                              resolve(result)
                        }
                  }
            )
      })
};

const fetchEmployees = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM employee',
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

const getEmployeeByEmail = (email) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM employee WHERE email = ?',
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

const updateEmployeeProfile = (email, keys, values) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `UPDATE employee SET ${keys} WHERE email = ?`,
                  [...values, email],
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

const fetchEmployeeById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM employee WHERE id = ?',
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

const deleteEmployeeById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `DELETE FROM employee WHERE id = ?`,
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

const updateEmployeeById = (id, keys, values) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `UPDATE employee SET ${keys} WHERE id = ?`,
                  [...values, id],
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

module.exports = { createEmployee, fetchEmployees, getEmployeeByEmail, updateEmployeeProfile, fetchEmployeeById, deleteEmployeeById, updateEmployeeById }