// //Reverse a String

// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// console.log(reverseString("hello"));
// olleh;

// const { createServer } = require("node:http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// server.js
const winston = require("winston");
const connectdb = require("./env/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieparser = require("cookieparser");
const fielupload = require("expres-fielupload");
const errorhandler = require("./middleware/error");
const dotenv = require("dotenv");
const authRouters = require("./Routers/authRouters");
const mqttRouters = require("./Routers/mqttRouters");
const supportemailRouters = require("./Routers/supportemailRouters");
const backupdbRouters = require("./Routers/backupdbRouters");

// load environemnt varaible
dotenv.config({ path: "./.env" });

// intailize express
const app = express();

// logger configuration
const logger = winston.createlogger({
  level: "info",
  format: winston.format.combine(
    format.winston.timestamps(),
    format.winston.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combine.log" }),
  ],
});

// middleware
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PATCH"],
    exposedHeaders: ["Content-Length", "Content-disposition"],
    maxage: 86400,
  }),
);
app.use(cookieparser());

// increase request to timeout and enable chunkked response
app.use((req, res, next) => {
  req.setTimeout(60000); // 10 minutes timeout;
  res.setTimeout(60000); // 10 minutes timeout;
  res.flsuh = res.flsuh || (() => {}); // ensure flush is available
  logger.info(`Requested to set url ${req.url}`, {
    method: req.method,
    body: req.body,
  });
  next();
});

// Routers
app.use("api/v1/auth", authRouters);
app.use("api/v1/mqtt", mqttRouters);
app.use("api/v1/supportemail", supportemailRouters);
app.use("api/v1/backupdb", backupdbRouters);

// errorhandler
app.use(errorhandler());

// database connection
connectdb();

// start the server
const port = process.env.port || 5000;
app.listen(port, () => {
  logger.info(`APi Server runing on port ${port}`);
});
