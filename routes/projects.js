
const express = require('express');
const router = express.Router();
const connection = require('../db'); // Imports database connection

// Middleware to handle errors
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Middleware to handle success responses
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Middleware to handle authentication and authorization
router.use((req, res, next) => {
  // TODO
  // Check if the user is authenticated and authorized to access this resource
  // If not, return a 401 Unauthorized response
  next();
});

// Middleware to handle common response format for success
function successResponse(data) {
  return { success: true, data };
}

// Middleware to handle common response format for errors
function errorResponse(message) {
  return { success: false, message };
}

// GET request to retrieve all projects from database
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM projects', (error, results) => {
    if (error) {
      next(error);
    } else {
      res.send(successResponse(results)); // Sends retrieved projects 
    }
  });
});

  
  // POST request to add a new project to the database
router.post('/', (req, res, next) => {
  const { title, description, image_url, github_url } = req.body; // Extracts project data from request body
  // Executes database query to insert project into projects table
  connection.query(
    'INSERT INTO projects (title, description, image_url, github_url) VALUES (?, ?)',
    [title, description, image_url, github_url],
    (error, results) => {
      if (error) { 
        next(error);
      } else {
        res.send(successResponse('Project added successfully'));
      }
    }
  );
});

module.exports = router; // Exports the router module
