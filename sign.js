const winston = require("winston");
const connectdb = require("./env/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieparser = require("cookieparser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const authRouters = require("./Routers/authrouters");
const mqttRouters = require("./Routers/mqttRouters");
const supportemailRouters = require("./Routers/supportemailRouters");
const bckupdbRouters = require("./Routers/ backupdbRouters");

// load environment varaible
dotenv.config({ path: "./.env" });

// iniatlize express
constapp = express();

// logger configuration
const logger = winston.createlogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamps(),
    winston.format.json(),
  ),
  transport: [
    new winston.transport.File({ filename: "error.log" }),
    new winston.transport.fiel({ filename: "combine.log" }),
  ],
});

// middleware
