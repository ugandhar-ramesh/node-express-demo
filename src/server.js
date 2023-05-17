const http = require('http');

// Additional setup for the server
const server = http.createServer((req, res) => {
  const url = req.url;
  // about page
  if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>about page</h1>');
    res.end();
  }
  // Not Found page
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>page not found</h1>');
    res.end();
  }
});

// Start the server
// server.listen(5000, () => {
//   console.log('Server is running');
// });

module.exports = server;
