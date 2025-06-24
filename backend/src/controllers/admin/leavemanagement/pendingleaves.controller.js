const { pendingLeaves } = require("../../../models/leavemanagement.model");
const sendJSON = require("../../../utils/sendjson");

const getPendingLeaves = async (req, res) => {
      try {
            const result = await pendingLeaves();
            if(!result) {
                  return sendJSON(res, 400, { message: '' })
            }
            return sendJSON(res, 200, result )
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = getPendingLeaves