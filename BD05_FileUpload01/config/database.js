const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DATABASE CONNECTION SUCCESSFULL");
    })
    .catch((err) => {
      console.log("Database Connection is not successfull due to some errors.");
      console.error(err);
      process.exit(1);
    });
};
