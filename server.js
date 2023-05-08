// Main server logic, setting up the necessary middleware for parsing JSON and importing the routers for the diff routes.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const blogsRouter = require('./routes/blogs');
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
