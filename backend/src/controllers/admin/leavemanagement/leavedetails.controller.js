const { fetchLeaveDetailsByEmplyeeId } = require("../../../models/leaves.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");

const getLeaveDetailsByUser = async (req, res) => {
      try {
            const {id} = await parseJSONBody(req)

            const [result] = await fetchLeaveDetailsByEmplyeeId(id);

            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, {message: 'Leave updated Successfully', result})
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getLeaveDetailsByUser