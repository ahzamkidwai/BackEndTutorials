const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello ji kaise hain aap sab log");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  res.send("Car Submitted Successfully.");
});

app.listen(3000, () => {
  console.log("Server Running at Port 3000");
});

const mongoose = require("mongoose");
//Connecting Express with MongoDB is a Promise which has two state : response and reject
mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


  .then(() => {
    console.log("Connection between MongoDB and Express JS is Successful");
  })

  .catch((error) => {
    console.log("Recived an Error");
  });