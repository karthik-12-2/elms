const { updateLeaveForTheEmployee } = require("../../../models/leaves.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");


const updateLeave = async (req, res, id) => {
      try {
            
            const { leavestatus, adminremark } = await parseJSONBody(req)
            const result = await updateLeaveForTheEmployee(id, leavestatus, adminremark);
            if (!result) {
                  return sendJSON(res, 400, { mesage: '' })
            }
            return sendJSON(res, 200, { message: 'Leave updated Successfully' })
      } catch (error) {
            sendJSON(res, 500, { message: 'Internal server error' })
      }
}

module.exports = updateLeave