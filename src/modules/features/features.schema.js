const mongoose = require('mongoose');

const { Schema } = mongoose;
const Feature = new Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  icon: {
    type: String,
  },
  link: {
    type: String,
  },
  order: {
    type: Number,
  },
  status: {
    type: String,
  },
  featuresIdParent: {
    type: Schema.Types.ObjectId,
    ref: 'Feature',
  },
}, { timestamps: true });

module.exports = mongoose.model('Feature', Feature);
