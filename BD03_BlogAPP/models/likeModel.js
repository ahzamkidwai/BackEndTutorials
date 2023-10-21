//Import Mongoose
const mongoose = require("mongoose");

//Route Handler
const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Post",
  },
  user: {
    type: String,
    required: true,
  },
});

//Export
module.exports = mongoose.model("Like", likeSchema);
