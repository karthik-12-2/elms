const parseJSONBody = (req) => {
      return new Promise((resolve, reject) => {
            let body = '';

            req.on('data', chunk => {
                  body += chunk.toString()
            });

            req.on('end', () => {
                  try {
                        const parsed = JSON.parse(body)
                        resolve(parsed)
                  } catch (error) {
                        reject(error)
                  }
            });

            req.on('error', (error) => {
                  reject(error)
            })
      })
}

module.exports = parseJSONBody