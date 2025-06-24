const loginController = require('../controllers/login.controller.js');

const loginRouter = (req, res) => {
      if(req.method === 'POST') {
            return loginController(req, res);
      }
}

module.exports = loginRouter;