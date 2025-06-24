const { updateLeaveTypeById } = require("../../../models/leavetype.model")
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const updateLeaveType = async (req, res, id) => {
      try {
            const leaveTypeData = await parseJSONBody(req)

            const keys = Object.keys(leaveTypeData)
            const values = Object.values(leaveTypeData)
            const setClauseForKeys = keys.map(key => `${key} = ?`).join(', ')
            const result = await updateLeaveTypeById(id, setClauseForKeys, values)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Leavetype record updated Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = updateLeaveType