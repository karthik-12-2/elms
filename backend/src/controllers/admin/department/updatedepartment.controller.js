const { updateDepartmentById } = require("../../../models/department.model")
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const updateDepartment = async (req, res, id) => {
      try {
            const departmentData = await parseJSONBody(req)

            const keys = Object.keys(departmentData)
            const values = Object.values(departmentData)
            const setClauseForKeys = keys.map(key => `${key} = ?`).join(', ')

            const result = await updateDepartmentById(id, setClauseForKeys, values)

            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Department record updated Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = updateDepartment