//Import Mongoose
const mongoose = require("mongoose");

//Route Handler
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
});

//Export
module.exports = mongoose.model("user", userSchema);
