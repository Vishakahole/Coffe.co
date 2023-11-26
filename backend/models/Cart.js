const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      name: {
        type: String,
        // required: true,
      },
      price: {
        type: Number,
        // required: true,
      },
      pic: {
        type: String,
        // required: true,
      },
      quantity: {
        type: Number,
        default:1,
        // required: true,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the customer model
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);