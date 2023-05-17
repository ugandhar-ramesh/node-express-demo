// import app from './src/app.js';
const app = require('./src/app.js');
// const server = require('./src/server');

const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

// server.listen(5000, () => {
//   console.log(`Server is running on http://localhost:5000`);
// });
