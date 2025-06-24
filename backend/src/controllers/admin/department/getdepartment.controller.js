const { fetchDepartmentById } = require("../../../models/department.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");

const getDepartment = async (req, res) => {
      try {
            const {id} = await parseJSONBody(req)

            const [result] = await fetchDepartmentById(id);

            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getDepartment