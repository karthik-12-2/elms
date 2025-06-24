const { fetchDepartment } = require("../../../models/department.model");
const sendJSON = require("../../../utils/sendjson")

const getAllDepartment = async (req, res) => {
      try {
            const result = await fetchDepartment();
            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getAllDepartment