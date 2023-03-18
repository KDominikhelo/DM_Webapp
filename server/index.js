// app.js

const express = require("express");
const cors = require("cors");
const conn = require("./conn/conn");
const endpoint = require("./endpoint/endpoint")
const bodyparser = require("body-parser");

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());
app.use(conn.router);
app.use("/",endpoint);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
