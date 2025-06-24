const { fetchEmployeeById} = require("../../../models/employee.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson")

const getEmployee = async (req, res) => {
      try {
            const {id} = await parseJSONBody(req)
            const [result] = await fetchEmployeeById(id);
            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getEmployee