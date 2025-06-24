const { approvedLeaves } = require("../../../models/leavemanagement.model");
const sendJSON = require("../../../utils/sendjson");

const getApprovedLeaves = async (req, res) => {
      try {
            const result = await approvedLeaves();
            if(!result) {
                  return sendJSON(res, 400, { message: '' })
            }
            return sendJSON(res, 200, result )
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = getApprovedLeaves