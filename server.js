// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Get our API routes
const api = require('./src/server/routes/api');
const table_routes = require('./src/server/routes/table-routes');
const booking_routes = require('./src/server/routes/booking-routes');

const app = express();
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(__dirname + 'dist/Project'));

// Set our api routes
app.use('/api', [
  api, 
  table_routes, 
  booking_routes
]);

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
  res.sendFile(__dirname);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));