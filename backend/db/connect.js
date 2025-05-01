// db/connect.js
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,  // Ensure MongoDB connection uses the latest parser
      useUnifiedTopology: true, // Use the new unified topology engine
      // Remove useCreateIndex and useFindAndModify, which are no longer necessary
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if DB connection fails
  }
};

module.exports = connectDB;
