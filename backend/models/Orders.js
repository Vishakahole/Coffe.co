const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fooditems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending to Accept by Restaurant',
  },
  deliveryAdd: {
    type: String,
    
  },
});

module.exports = mongoose.model('Order', orderSchema);