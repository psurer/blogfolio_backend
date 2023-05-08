const express = require('express');
const router = express.Router();
const connection = require('../db');

// Handles GET requests to the / route
router.get('/', (req, res) => {
     // Select all blogs from the "blogs" table
  connection.query('SELECT * FROM blogs', (error, results) => {
    if (error) {
      console.error('Error retrieving blogs: ', error);
      res.status(500).send('Error retrieving blogs');
    } else {
          // Returns the results as a response
      res.send(results);
    }
  });
});

// Handles POST requests to the / route
router.post('/', (req, res) => {
  const { title, content } = req.body; // Extracts the title and content from the request body

  // Insert the new blog post into the "blogs" table
  connection.query(
    'INSERT INTO blogs (title, content) VALUES (?, ?)',
    [title, content],
    (error, results) => {
      if (error) {
        console.error('Error adding blog: ', error);
        res.status(500).send('Error adding blog');
      } else {
        res.send('Blog added successfully');
      }
    }
  );
});

module.exports = router;
