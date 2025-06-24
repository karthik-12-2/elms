const { latestLeave } = require("../../models/leavemanagement.model");
const sendJSON = require("../../utils/sendjson")

const getLatestLeave = async (req, res) => {
      try {
            const result = await latestLeave();
            if(!result){
                 return sendJSON(res, 400, {mesage: ''})
            }
            return sendJSON(res, 200, result)
      } catch (error) {
            sendJSON(res, 500, {message: 'Internal server error'})
      }
}

module.exports = getLatestLeave