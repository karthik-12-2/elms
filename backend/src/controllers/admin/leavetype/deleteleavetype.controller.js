const { deleteLeaveTypeById } = require("../../../models/leavetype.model")
const sendJSON = require("../../../utils/sendjson")

const deleteLeaveType = async (req, res, id) => {
      try {    
            const result = await deleteLeaveTypeById(id)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Leavetype record deleted Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = deleteLeaveType