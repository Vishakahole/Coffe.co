const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  // Reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Make sure to require this field if it's necessary
  },

  // Reference to the Cart model
//   cart: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart',
//   },

  // Reference to the Order model
//   orders: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Order',
//     },
//   ],
});

module.exports = mongoose.model('Customer', customerSchema);