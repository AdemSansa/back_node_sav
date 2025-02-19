const mongoose = require('mongoose');


const {Schema} = mongoose;

const User = new Schema ({
    email: {
      type: String,
      required: true,
      unique: true,
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
    
    
  },
  { timestamps: true });


module.exports = mongoose.model('User', User);