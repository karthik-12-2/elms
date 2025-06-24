const adddepartment = require("../controllers/admin/department/adddepartment.controller.js");
const deleteDepartment = require("../controllers/admin/department/deletedepartment.controller.js");
const getAllDepartment = require("../controllers/admin/department/getalldepartment.controller.js");
const getDepartment = require("../controllers/admin/department/getdepartment.controller.js");
const updateDepartment = require("../controllers/admin/department/updatedepartment.controller.js");
const addemployee = require("../controllers/admin/employee/addemployee.controller.js");
const deleteEmployee = require("../controllers/admin/employee/deleteemployee.controller.js");
const getAllEmployees = require("../controllers/admin/employee/getallemployee.controller.js");
const getEmployee = require("../controllers/admin/employee/getemployee.controller.js");
const updateEmployee = require("../controllers/admin/employee/updateemployee.controller.js");
const getLatestLeave = require("../controllers/admin/latestleave.controller.js");
const getAllLeaves = require("../controllers/admin/leavemanagement/allleaves.controller.js");
const getApprovedLeaves = require("../controllers/admin/leavemanagement/approvedleaves.controller.js");
const getLeaveDetailsByUser = require("../controllers/admin/leavemanagement/leavedetails.controller.js");
const getNotApprovedLeaves = require("../controllers/admin/leavemanagement/notapprovedleaves.controller.js");
const getPendingLeaves = require("../controllers/admin/leavemanagement/pendingleaves.controller.js");
const updateLeave = require("../controllers/admin/leavemanagement/updateleave.controller.js");
const addLeaveType = require("../controllers/admin/leavetype/addleavetype.controller.js");
const deleteLeaveType = require("../controllers/admin/leavetype/deleteleavetype.controller.js");
const getAllLeaveType = require("../controllers/admin/leavetype/getallleavetype.controller.js");
const getLeaveType = require("../controllers/admin/leavetype/getleavetype.controller.js");
const updateLeaveType = require("../controllers/admin/leavetype/updateleavetype.controller.js");
const changePassword = require("../controllers/changepassword.controller.js");
const auth = require('../middleware/auth.middleware.js');

const admin = (req, res) => {
      const url = require('url')
      if (req.url.includes('/changepassword')) {
            return auth(req, res, () => {
                  changePassword(req, res)
            });
      } else if (req.url.includes('/addemployee')) {
            return auth(req, res, () => {
                  addemployee(req, res)
            })
      } else if (req.url.includes('/fetchemployees')) {
            return auth(req, res, () => {
                  getAllEmployees(req, res)
            })
      } else if (req.url.includes('/employee')) {
            return auth(req, res, () => {
                  getEmployee(req, res)
            })
      } else if (req.url.includes('/deleteemployee') && req.method === 'DELETE') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  deleteEmployee(req, res, id)
            })
      } else if (req.url.includes('/updateemployeeprofile') && req.method === 'PUT') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  updateEmployee(req, res, id)
            })
      } else if (req.url.includes('/adddepartment')) {
            return auth(req, res, () => {
                  adddepartment(req, res)
            })
      } else if (req.url.includes('/fetchdepartment')) {
            return auth(req, res, () => {
                  getAllDepartment(req, res)
            })
      } else if (req.url.includes('/managedepartment/dept')) {
            return auth(req, res, () => {
                  getDepartment(req, res)
            })
      } else if (req.url.includes('/updatedepartment') && req.method === 'PUT') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  updateDepartment(req, res, id)
            })
      } else if (req.url.includes('/deletedepartment') && req.method === 'DELETE') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  deleteDepartment(req, res, id)
            })
      } else if (req.url.includes('/addleavetype')) {
            return auth(req, res, () => {
                  addLeaveType(req, res)
            })
      } else if (req.url.includes('/fetchleavetype')) {
            return auth(req, res, () => {
                  getAllLeaveType(req, res)
            })
      } else if (req.url.includes('/manageleavetype/id')) {
            return auth(req, res, () => {
                  getLeaveType(req, res)
            })
      } else if (req.url.startsWith('/admin/updateleavetype/') && req.method === 'PUT') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  updateLeaveType(req, res, id)
            })
      } else if (req.url.includes('/deleteleavetype') && req.method === 'DELETE') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  deleteLeaveType(req, res, id)
            })
      } else if (req.url.includes('/allleaves')) {
            return auth(req, res, () => {
                  getAllLeaves(req, res)
            })
      } else if (req.url.includes('/approvedleaves')) {
            return auth(req, res, () => {
                  getApprovedLeaves(req, res)
            })
      } else if (req.url.includes('/notapprovedleaves')) {
            return auth(req, res, () => {
                  getNotApprovedLeaves(req, res)
            })
      } else if (req.url.includes('/pendingleaves')) {
            return auth(req, res, () => {
                  getPendingLeaves(req, res)
            })
      } else if (req.url.includes('/getlatestleave')) {
            return auth(req, res, () => {
                  getLatestLeave(req, res)
            })
      } else if (req.url.includes('/leavedetails')) {
            return auth(req, res, () => {
                  getLeaveDetailsByUser(req, res)
            })
      } else if (req.url.startsWith('/admin/updateleave/') && req.method === 'PUT') {
            const id = url.parse(req.url).pathname.split('/')[3]
            return auth(req, res, () => {
                  updateLeave(req, res, id)
            })
      }

}

module.exports = admin