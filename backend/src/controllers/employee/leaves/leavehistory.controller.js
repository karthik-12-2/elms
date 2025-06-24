const { fetchLeaveByEmployee } = require("../../../models/leaves.model")
const sendJSON = require("../../../utils/sendjson")

const leaveHistory = async (req, res) => {
      try {
            const { email } = req.user
            const result = await fetchLeaveByEmployee(email)
            console.log(result)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, result )
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = leaveHistory