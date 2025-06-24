const { createEmployee } = require("../../../models/employee.model");
const { createUser } = require("../../../models/user.model");
const { hashPassword } = require("../../../utils/hashPassword");
const parseJSONBody = require("../../../utils/parsejsonbody")
const sendJSON = require("../../../utils/sendjson")

const addemployee = async (req, res) => {
      try {
            const { employeecode,
                  gender,
                  birthdate,
                  firstname,
                  lastname,
                  department,
                  country,
                  email,
                  city,
                  address,
                  mobilenumber,
                  password
            } = await parseJSONBody(req);

            const newEmployee = await createEmployee(employeecode,
                  gender,
                  birthdate,
                  firstname,
                  lastname,
                  department,
                  country,
                  email,
                  city,
                  address,
                  mobilenumber,
                  'active'
            )

            if (!newEmployee) {
                  return sendJSON(res, 400, { message: "Employee creation failed" })
            }
            const hashedPassword = await hashPassword(password)
            const result = await createUser(email, hashedPassword, 'employee')

            if (!result) {
                  return sendJSON(res, 400, { message: "Employee creation failed" })
            }
            return sendJSON(res, 200, { message: "Employee created successfully" })

      } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                  const match = error.sqlMessage.match(/for key '.*\.(.*?)_UNIQUE'/)
                  const column = match ? match[1] : null
                  return sendJSON(res, 400, { message: column ? `${column} already exists` : `Duplicate entry found` })
            }
            return sendJSON(res, 500, { message: 'Internal Server Error' })
      }
}

module.exports = addemployee