const { deleteEmployeeById } = require('../../../models/employee.model')
const sendJSON = require('../../../utils/sendjson')

const deleteEmployee = async (req, res, id) => {
      try {
            const result = await deleteEmployeeById(id)

            if (!result) {
                  return sendJSON(res, 400, { message: "Data not found" })
            }

            return sendJSON(res, 200, { message: 'Employee record deleted Successfully' })
      } catch (error) {
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = deleteEmployee