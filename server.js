const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('website'));

// Setup Server
const port = 3002; 
const host = 'localhost';
app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

// GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route
app.post('/add', (req, res) => {
  projectData = req.body;
  res.send({ message: 'Data saved' });
});
