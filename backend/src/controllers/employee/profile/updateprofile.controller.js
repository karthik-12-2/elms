const { updateEmployeeProfile } = require("../../../models/employee.model")
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const updateProfile = async (req, res) => {
      try {
            const { email } = req.user
            const profiledata = await parseJSONBody(req)
            
            const keys = Object.keys(profiledata)
            const values = Object.values(profiledata)
            const setClauseForKeys = keys.map(key => `${key} = ?`).join(', ')
            const result = await updateEmployeeProfile(email, setClauseForKeys, values)
            console.log(result)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, {message: 'Profile updated successfully'} )
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = updateProfile