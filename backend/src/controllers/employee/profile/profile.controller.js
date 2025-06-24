const { getEmployeeByEmail } = require("../../../models/employee.model")
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const profile = async (req, res) => {
      try {
            // const profileData = await parseJSONBody(req)
            const { email, password, role } = req.user

            if (!email || !password || !role) {
                  return sendJSON(res, 400, { message: 'Missing email, password, or role' })
            }

            const [result] = await getEmployeeByEmail(email)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { result })

      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = profile