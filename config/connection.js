const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/social-network';

// MongoDB options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to the MongoDB server
async function connect() {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect };