const mysql = require('mysql2');
// This file will contain the database connection logic, allowing us to connect to the MySQL database.
// Adding Dummy Data
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'myBlogs'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
  } else {
    console.log('Database connection successful!');
  }
});
