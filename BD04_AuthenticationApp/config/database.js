const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DATABASE Connection Successfully");
    })
    .catch((err) => {
      console.log("DATABASE Connection is not successfull due to some error.");
      console.error(err);
      process.exit(1);
    });
};
