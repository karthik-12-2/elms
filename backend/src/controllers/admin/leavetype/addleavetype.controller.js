const { createLeaveType } = require("../../../models/leavetype.model");
const parseJSONBody = require("../../../utils/parsejsonbody");
const sendJSON = require("../../../utils/sendjson");

const addLeaveType = async (req, res) => {
      try {
            const { leavetype, description } = await parseJSONBody(req);

            const result = await createLeaveType(leavetype, description)

            if (!result) {
                  return sendJSON(res, 400, { message: 'Department creation failed' })
            }

            return sendJSON(res, 200, { message: 'Leavetype created successfully' })
      } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                  const match = error.sqlMessage.match(/for key '.*\.(.*?)_UNIQUE'/)
                  const column = match ? match[1] : null
                  return sendJSON(res, 400, { message: column ? `${column} already exists` : `Duplicate entry found` })
            }
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = addLeaveType