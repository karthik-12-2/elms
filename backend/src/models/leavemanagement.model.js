const db = require('../config/db.js');

const allLeaves = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, concat(e.firstname, ' ', lastname) AS employeename 
                  FROM leaves l
                  JOIN employee e ON l.email = e.email`,
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

const pendingLeaves = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, concat(e.firstname, ' ', lastname) AS employeename 
                  FROM leaves l  
                  JOIN employee e ON l.email = e.email
                  WHERE l.status = 'waiting for approval'`,
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

const approvedLeaves = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, concat(e.firstname, ' ', lastname) AS employeename 
                  FROM leaves l 
                  JOIN employee e ON l.email = e.email
                  WHERE l.status = 'approved'`,
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

const notApprovedLeaves = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, concat(e.firstname, ' ', lastname) AS employeename 
                  FROM leaves l 
                  JOIN employee e ON l.email = e.email
                  WHERE l.status = 'notapproved'`,
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

const latestLeave = () => {
      return new Promise((resolve, reject) => {
            db.query(
                  `SELECT l.*, concat(e.firstname, ' ', lastname) AS employeename 
                  FROM leaves l 
                  JOIN employee e ON l.email = e.email 
                  ORDER BY l.postingdate DESC
                  LIMIT 5`,
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

module.exports = { allLeaves, pendingLeaves, approvedLeaves, notApprovedLeaves, latestLeave }