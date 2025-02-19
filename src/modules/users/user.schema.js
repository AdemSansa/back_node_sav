const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const zeroPad = (num, places) => String(num).padStart(places, '0');

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    type: {
      type: String,
      enum: ['user', 'super'],
      default: 'user',
    },
    code: {
      value: {
        type: String,
        required: true,
      },
      expireIn: {
        type: Date,
        default: () => moment().add(24, 'hours').toDate(),
      },
      attempts: {
        type: Number,
        default: 3,
      },
    },
    search: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// 🔹 Virtual Field: `fullname`
UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// 🔹 Pre-Save Hook: Generate `code` and Update `search`
UserSchema.pre('save', async function (next) {
  if (!this.code.value) {
    const userCount = await mongoose.model('User').countDocuments();
    this.code.value = zeroPad(userCount + 1, 6); // Generates '000001', '000002', etc.
  }

  this.search = `${this.firstname} ${this.lastname} ${this.email} ${this.code.value}`;
  next();
});

module.exports = mongoose.model('User', UserSchema);
