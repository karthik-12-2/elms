const http = require('http');
const router = require('./routes/index.js');

const server = http.createServer((req, res) => {
      // Set CORS headers manually
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, email, password, role');

      // Handle preflight requests (OPTIONS)
      if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
      }

      // Pass the request to the router
      router(req, res);
})

server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
});
