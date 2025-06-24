const db = require('../config/db.js');

const createDepartment = (departmentcode, departmentname, departmentshortname) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'INSERT INTO department (departmentcode, departmentname, departmentshortname) VALUES (?, ?, ?)',
                  [departmentcode, departmentname, departmentshortname],
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

const fetchDepartment = () =>{
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM department',
                  (err, result) => {
                        if(err){
                              reject(err)
                        }else {
                              resolve(result)
                        }
                  }
            )
      })
}

const fetchDepartmentById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM department WHERE id = ?',
                  [id],
                  (err, result) => {
                        if(err){
                              reject(err)
                        }else {
                              resolve(result)
                        }
                  }
            )
      })
}

const updateDepartmentById = (id, keys, values) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `UPDATE department SET ${keys} WHERE id = ?`,
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

const deleteDepartmentById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `DELETE FROM department WHERE id = ?`,
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

module.exports = { createDepartment, fetchDepartment, fetchDepartmentById, updateDepartmentById, deleteDepartmentById }