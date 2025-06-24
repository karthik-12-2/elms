const { register } = require("../../models/user.model");
const { hashPassword } = require("../../utils/hashPassword");
const parseJSONBody = require("../../utils/parsejsonbody");
const sendJSON = require("../../utils/sendjson");

const adminRegister = async (req, res) => {
      
      try {
            const { email, password, role } = await parseJSONBody(req);
            
            if (!email || !password || !role) {
                  return sendJSON(res, 400, { message: 'Missing email, password, or role' })
            }

            const hashedPassword = await hashPassword(password);
            const result = await register(email, hashedPassword, role);
            if (!result) {
                  return sendJSON(res, 400, { message: '' })
            }
            return sendJSON(res, 200, {
                  message: 'Register successful'
            })
      } catch (error) {
            console.error('Login Controller Error:', error);
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = adminRegister