const express = require('express');
const router = express.Router();
const connection = require('../db'); // Imports database connection

// GET request to retrieve all projects from database
router.get('/', (req, res) => {
  connection.query('SELECT * FROM projects', (error, results) => {
    if (error) {
      console.error('Error retrieving projects: ', error); // Logs error
      res.status(500).send('Error retrieving projects'); // Sends error response
    } else {
      res.send(results); // send retrieved projects
    }
  });
});

// POST request to add a new project to the database
router.post('/', (req, res) => {
  const { title, description, image_url, demo_url, github_url } = req.body; // Extracts project data from request body

  // Executes database query to insert project into projects table
  connection.query(
    'INSERT INTO projects (title, description, image_url, demo_url, github_url) VALUES (?, ?, ?, ?, ?)',
    [title, description, image_url, demo_url, github_url],
    (error, results) => {
      if (error) {
        console.error('Error adding project: ', error); // Logs error
        res.status(500).send('Error adding project'); // Sends error response
      } else {
        res.send('Project added successfully'); // Sends success response
      }
    }
  );
});

module.exports = router; // Exports the router module
