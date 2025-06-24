const db = require('../config/db.js');
const createLeaveType = (leavetype, description) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'INSERT INTO leavetype (leavetype, description) VALUES (?, ?)',
                  [leavetype, description],
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

const fetchLeaveTypes = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM leavetype',
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

const fetchLeaveTypeById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  'SELECT * FROM leavetype WHERE id = ?',
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

const updateLeaveTypeById = (id, keys, values) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `UPDATE leavetype SET ${keys} WHERE id = ?`,
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

const deleteLeaveTypeById = (id) => {
      return new Promise((resolve, reject) => {
            db.query(
                  `DELETE FROM leavetype WHERE id = ?`,
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

module.exports = { createLeaveType, fetchLeaveTypes, fetchLeaveTypeById, updateLeaveTypeById, deleteLeaveTypeById }