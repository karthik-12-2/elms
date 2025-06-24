const sendJSON = (res, statuscode, data) => {
      res.writeHead(statuscode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
}

module.exports = sendJSON