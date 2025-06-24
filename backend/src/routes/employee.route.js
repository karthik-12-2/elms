const changePassword = require('../controllers/changepassword.controller.js');
const getEmployeeName = require('../controllers/employee/getEmployeename.controller.js');
const applyLeave = require('../controllers/employee/leaves/applyleave.controller.js');
const leaveHistory = require('../controllers/employee/leaves/leavehistory.controller.js');
const profile = require('../controllers/employee/profile/profile.controller.js');
const updateProfile = require('../controllers/employee/profile/updateprofile.controller.js');
const auth = require('../middleware/auth.middleware.js');

const employee = (req, res) => {
      if (req.url.includes('/changepassword')) {
            return auth(req, res, () => {
                  changePassword(req, res)
            });
      } else if (req.url.includes('/username')) {
            return auth(req, res, () => {
                  getEmployeeName(req, res)
            })
      } else if (req.url.includes('/applyleave')) {
            return auth(req, res, () => {
                  applyLeave(req, res)
            });
      } else if (req.url.includes('/leavehistory')) {
            return auth(req, res, () => {
                  leaveHistory(req, res)
            });
      } else if (req.url.includes('/myprofile')) {
            return auth(req, res, () => {
                  profile(req, res)
            });
      } else if (req.url.includes('/updateprofile')) {
            return auth(req, res, () => {
                  updateProfile(req, res)
            })
      }
}

module.exports = employee