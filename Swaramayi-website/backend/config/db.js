const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // If local MongoDB is not running, warn but don't exit hard so mock memory mode or fallback works gracefully
  }
};

module.exports = connectDB;
