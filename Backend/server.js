// server.js
const mongoose = require('mongoose');
const app = require('./app'); // Import express app
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // Load environment variables

// MongoDB connection string
const DB = process.env.DATABASE_LOCAL || 'mongodb://127.0.0.1:27017/homelyhub-chatbot';

mongoose.connect(DB)
  .then(() => console.log('✅ DB connection successful'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1); // Exit process if the database connection fails
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
