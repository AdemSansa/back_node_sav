const mongoose = require('mongoose');

const mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?authSource=admin${process.env.ENV.toLowerCase() !== 'local' ? '&replicaSet=rs0' : ''}`;

const setupMongoServer = async () => {
  try {
    await mongoose.connect(mongoUri, process?.env?.ENV === 'local' ? {
      serverSelectionTimeoutMS: 120000, // Adjust timeout if needed
    } : null);
    console.info('Database connected successfully !!');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = setupMongoServer;
