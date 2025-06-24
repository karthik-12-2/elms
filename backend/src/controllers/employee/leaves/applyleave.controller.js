const { applyLeaveByEmployee } = require("../../../models/leaves.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");

const applyLeave = async (req, res) => {
      try {
            const {email} = req.user
            const { from, to, leavetype, description } = await parseJSONBody(req);

            
            const result = await applyLeaveByEmployee(from, to, leavetype, description, email)
            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Leave applied successfully' })

      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = applyLeave