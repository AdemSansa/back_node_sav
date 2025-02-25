const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;
const setupMongoServer = async () => {
  try {
    await mongoose.connect(mongoUri, process?.env?.ENV?.toLowerCase() === 'local' ? {
      serverSelectionTimeoutMS: 120000, // Adjust timeout if needed
    } : null);
    console.info('Database connected successfully !!');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = setupMongoServer;
