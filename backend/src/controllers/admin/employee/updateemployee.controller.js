const { updateEmployeeById } = require("../../../models/employee.model")
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const updateEmployee = async (req, res, id) => {
      try {
            const departmentData = await parseJSONBody(req)

            const keys = Object.keys(departmentData)
            const values = Object.values(departmentData)
            const setClauseForKeys = keys.map(key => `${key} = ?`).join(', ')

            const result = await updateEmployeeById(id, setClauseForKeys, values)

            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Employee record updated Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = updateEmployee