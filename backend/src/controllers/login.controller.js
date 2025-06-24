const { login, getUserByEmail } = require('../models/user.model.js');
const { comparePassword } = require('../utils/hashPassword.js');
const parseJSONBody = require('../utils/parsejsonbody.js');
const sendJSON = require('../utils/sendjson.js');

const loginController = async (req, res) => {
      try {
            const { email, password, role } = await parseJSONBody(req);
            if (!email || !password || !role) {
                  return sendJSON(res, 400, { message: 'Missing email, password, or role' })
            }

            const user = await getUserByEmail(email);
            // check if the user exists
            if (!user || user[0].length === 0) {
                  return sendJSON(res, 401, { message: 'User doesnot exists' })
            }

            const isPasswordValid = await comparePassword(password, user[0].password);

            if (!isPasswordValid) {
                  return sendJSON(res, 401, { message: 'Invalid password' })
            }

            const [rows] = await login(email, user[0].password, role);
            return sendJSON(res, 200, {
                  message: 'Login successful',
                  data: rows
            })
      } catch (error) {
            console.error('Login Controller Error:', error);
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = loginController;