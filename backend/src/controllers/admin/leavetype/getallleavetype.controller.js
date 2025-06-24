const { fetchLeaveTypes } = require("../../../models/leavetype.model");
const sendJSON = require("../../../utils/sendjson");

const getAllLeaveType = async (req, res) => {
      try {
            const result = await fetchLeaveTypes();
            if (!result) {
                  return sendJSON(res, 400, { mesage: '' })
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, { message: 'Internal server error' })
      }
}

module.exports = getAllLeaveType