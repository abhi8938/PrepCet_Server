const Joi=require('joi')
const mongoose=require('mongoose')

const DUR = {
  key: {
    type: String,
    required: true,
  },
  prev: {
    type: String,
    // required: true,
  },
  current: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
};

module.exports = DUR
