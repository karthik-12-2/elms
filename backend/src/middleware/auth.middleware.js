const { login } = require("../models/user.model");
const sendJSON = require("../utils/sendjson");

const auth = async (req, res, next) => {
      try {
            let email = req.headers['email']
            let password = req.headers['password']
            let role = req.headers['role']
            if (!email || !password || !role) {
                  return sendJSON(res, 400, { message: 'Missing email, password, or role' })
            }

            const user = await login(email, password, role);
            // check if the user exists
            if (!user || user[0].length === 0) {
                  return sendJSON(res, 401, { message: 'User doesnot exists' })
            }

            req.user = user[0]
            next();

      } catch (error) {
            console.error('Error parsing JSON:', error);
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = auth;