const { createDepartment } = require("../../../models/department.model");
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson");

const adddepartment = async (req, res) => {
      try {
            const { departmentcode, departmentname, departmentshortname } = await parseJSONBody(req);

            const result = await createDepartment(departmentcode, departmentname, departmentshortname)

            if (!result) {
                  return sendJSON(res, 400, { message: 'Department creation failed' })
            }

            return sendJSON(res, 200, { message: 'Department created successfully' })
      } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                  const match = error.sqlMessage.match(/for key '.*\.(.*?)_UNIQUE'/)
                  const column = match ? match[1] : null
                  return sendJSON(res, 400, { message: column ? `${column} already exists` : `Duplicate entry found` })
            }
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = adddepartment