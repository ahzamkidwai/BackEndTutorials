const express = require("express");
const app = express();

//Load Config from .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Middleware to parse json reuqest body
app.use(express.json());

//Imports Routes For TODO API
const todoRoutes = require("./routes/todos");

//Mount the TODO API Routes
app.use("/api/v1", todoRoutes);


//Start the server
app.listen(PORT, () => {
  console.log(`APP is Running at port ${PORT} Successfully`);
});

//Connect to DATABASE
const dbConnect = require("./config/database");
dbConnect();

//default Route
app.get("/",(req,res)=>{
    res.send(`<h1> This is a HOMEPAGE </h1>`)
})