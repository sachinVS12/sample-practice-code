const winston = require("winston");
const connectDB = require("./env/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieparser = require("cookieparser");
const fileupload = require("express-fileupload");
const errorhnadler = require("./middleware/error");
const dotenv = require("dotenv");
const authRouters = require("./Routers/authRouters");
const mqttRouters = require("./Routers/mqttRouters");
const supportemailRouters = require("./Routers/supportemailRouters");
const backupdbRouters = require("./Routers/backupdbRouters");

// load environment variable
dotenv.config({ path: "./.env" });

// intialize express
const app = express();

// logger configuration
const logger = winston.createlogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamps(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ fielname: "error.log", level: "error" }),
    new winston.transports.File({ fielname: "combined.log" }),
  ],
});

// middeware
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    exposedHeaders: ["Content-Length", "Content-disposition"],
    maxage: 86400,
  }),
);
app.use(cookieparser());

// increase request to timeout and enable chunkked response
app.use((req, res, next) => {
  req.setTimeout(60000);
  res.setTimeout(60000);
  res.flush = res.flush || (() => {}); // ensure flsuh is avialble
  logger.info(`Requetsed to set url ${req.url}`, {
    body: req.body,
    method: req.method,
  });
  next();
});

// Routers
app.use("api/v1/auth", authRouters);
app.use("api/v1/mqtt", mqttRouters);
app.use("api/v1/supportemail", supportemailRouters);
app.use("api/v1/backupdb", backupdbRouters);

// errorhandler
app.use(errorhnadler());

// database connection
connectDB();

// start the server
const port = process.env.port || 5000;
app.listen(port, "0.0.0.0", () => {
  logger.info(`API Server running on port ${port}`);
});
