const { getUserNameByEmployeeEmail } = require("../../models/user.model")
const sendJSON = require("../../utils/sendjson")

const getEmployeeName = async (req, res) => {
      try {
            const { email } = req.user
            const result = await getUserNameByEmployeeEmail(email)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, result )
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = getEmployeeName