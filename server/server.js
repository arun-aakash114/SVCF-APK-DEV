const express = require('express');
const app = express();
const port = 1020;

app.use((req, res, next) => {
  // Set CORS headers to allow all origins, methods, and headers
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// ... rest of your server configuration

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
