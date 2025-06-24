const admin = require('./admin.route.js');
const employee = require('./employee.route.js');
const loginRouter = require('./login.route.js');
const checkLoginStatus = require('../controllers/checkloginstatus.controller.js')

const router = (req, res) => {
      if (req.url.startsWith('/login')) {
            return loginRouter(req, res);
      } else if (req.url === '/checkLoginStatus' && req.method === 'POST') {
            return checkLoginStatus(req, res);
      } else if (req.url.startsWith('/admin')) {
            return admin(req, res)
      } else if (req.url.startsWith('/employee')) {
            return employee(req, res)
      } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
      }
}

module.exports = router;