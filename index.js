const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes');

mongoose.connect("mongodb://localhost:27017/social-network", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

app.use(router);

// Other server configurations and middleware

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
