const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const port = process.env.PORT || 3030;
const server = express();

// let token = token;

// const corsOptions = {
//   origin: "*",
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_MAROON_URI || "mongodb://localhost/loanie", (err, res) => {
  if (err) {
    console.log(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connected to: ${uristring}`, res);
  }
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Reads and set value in .env file
require("dotenv").config();

routes(server);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
