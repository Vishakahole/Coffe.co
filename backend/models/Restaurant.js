const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  Res_name: {
    type: String,
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the restaurant manager
    required: true,
  },
  EmenuCard: [
    {
      name: {
        type: String,
        // required: true,
      },
      pic: {
        type: String,
        // required: true,
      },
      price: {
        type: Number,
        // required: true,
      },
    },
  ],
  location: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);