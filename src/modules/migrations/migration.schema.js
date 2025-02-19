const mongoose = require('mongoose');

const MigrationSchema = new mongoose.Schema({
  file: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
});

module.exports = mongoose.model('Migration', MigrationSchema);
