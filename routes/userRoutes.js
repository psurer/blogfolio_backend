const express = require('express');
const router = express.Router(); // Creates a new router object with the Router() function from the Express.js library.
const connection = require('./db'); // Import the database connection

// Route for getting all users from the database
router.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => { //  Uses the database connection to execute a SQL query that selects all data from the users table
    if (error) { // IF an error occurs during the query, log the error to the console and send a 500 status code with an error message
      console.error('Error retrieving users: ', error);
      res.status(500).send('Error retrieving users');
    } else { // else IF the query is successful, send the results back to the client with a 200 status code
      res.send(results);
    }
  });
});

module.exports = router; // Exports the router object so it can be used by other parts of the application
