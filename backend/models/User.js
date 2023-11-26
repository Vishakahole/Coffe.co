const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
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
    pass: {
        type: String,
        // required: true,
      },
    cpass: {
      type: String,
      // required: true,
    },
    role: {
        type: String,
        default: "Customer",
        required:true,
    },
    Phone_no: {
      type: String,
    },
    location: {
      type: String,
    },
    
  },
  { timestamps: true }
);




module.exports = mongoose.model("User", userSchema);