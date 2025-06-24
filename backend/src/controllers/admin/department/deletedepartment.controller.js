const { deleteDepartmentById } = require("../../../models/department.model")
const sendJSON = require("../../../utils/sendjson")

const deleteDepartment = async (req, res, id) => {
      try {    
            const result = await deleteDepartmentById(id)

            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Department record deleted Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = deleteDepartment