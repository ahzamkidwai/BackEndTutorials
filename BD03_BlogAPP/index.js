const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

//Use MiddleWare
app.use(express.json());

const blog = require("./routes/blog");

//Mounting Process
app.use("/api/v1", blog);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`App is running Successfully at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1> This is my Homepage. </h1>`);
});
