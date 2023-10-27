//Creation of App
const express = require("express");
const app = express();

//Initialization of Port
require("dotenv").config();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Connecting App with Database
require("./config/database").connect();

//Connecting App with Cloudinary Database.
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//Mounting of Address.
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
  console.log(`Server is Running at Port Number ${PORT}`);
});
