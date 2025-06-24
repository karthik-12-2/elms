const { fetchEmployees } = require("../../../models/employee.model")
const sendJSON = require("../../../utils/sendjson")

const getAllEmployees = async (req, res) => {
      try {
            const result = await fetchEmployees();
            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getAllEmployees