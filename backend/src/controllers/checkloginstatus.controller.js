const { login } = require("../models/user.model");
const parseJSONBody = require("../utils/parsejsonbody");
const sendJSON = require("../utils/sendjson");

const checkloginstatus = async (req, res) => {
      try {
            const { email, password, role } = await parseJSONBody(req);
            console.log(email, password, role, 'from checkloginstatus')
            if (!email || !password || !role) {
                  sendJSON(res, 400, { message: 'Missing email, password, or role' })
            }

            const user = await login(email, password, role);

            // check if the user exists
            if (!user || user[0].length === 0) {
                  return sendJSON(res, 401, { message: 'User doesnot exists' })
            }

            return sendJSON(res, 200, {
                  message: 'authenticated',
                  data: user[0]
            })

      } catch (error) {
            console.error('Error parsing JSON:', error);
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }

}

module.exports = checkloginstatus;