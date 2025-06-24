const loginController = require('../controllers/login.controller.js');

const loginRouter = (req, res) => {
      console.log('Login Router', req.url);
      if(req.method === 'POST') {
            return loginController(req, res);
      }
}

module.exports = loginRouter;