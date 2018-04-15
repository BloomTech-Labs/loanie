const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./loanie-api/routes/routes");

const path = require("path");
const port = process.env.PORT || 8080;
const server = express();

// let token = token;

// const corsOptions = {
//   origin: "*",
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Reads and set value in .env file
require("dotenv").config();

routes(server);

server.listen(port, "0.0.0.0", () => {
  console.log(`server listening on port ${port}`);
});

server.get("*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "./loanie-view/public", "index.html")
  );
});
