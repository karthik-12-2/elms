const { fetchLeaveTypeById } = require("../../../models/leavetype.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");

const getLeaveType = async (req, res) => {
      try {
            const {id} = await parseJSONBody(req)

            const [result] = await fetchLeaveTypeById(id);

            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getLeaveType