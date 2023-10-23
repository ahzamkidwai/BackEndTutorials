const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json);

require("./config/database").connect();

//Routes and Mount

const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
