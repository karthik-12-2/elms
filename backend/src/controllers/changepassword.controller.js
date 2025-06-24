const { updatePassword } = require("../models/user.model")
const { comparePassword, hashPassword } = require("../utils/hashPassword")
const parseJSONBody = require("../utils/parsejsonbody")
const sendJSON = require("../utils/sendjson")

const changePassword = async (req, res) => {
      try {
            const { oldpassword, newpassword } = await parseJSONBody(req)
            const { email, password, role } = req.user
            const isMatch = await comparePassword(oldpassword, password)

            if (!isMatch) {
                  return sendJSON(res, 401, { message: 'Old password is incorrect' })
            }

            const newHashedPassword = await hashPassword(newpassword);
            const result = await updatePassword(email, role, newHashedPassword)

            if(!result){
                  return sendJSON(res, 400, { message: 'Password change failed' })
            }

            return sendJSON(res, 200, { message: 'Password changed successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = changePassword