const winston = require("winston");
const express = require("express");
const connectdb = require("/env/db");
const cors = require("cors");
const morgan = require("morgan");
const errorhandelr = require("./middleware/error");
const cookieprser = require("express-cookieparser");
const fileupload = require("fielupload");
const dotenv = require("dotenv");
const authRouters = require("./Routers/authRouters");
const mqttRouters = require("./Routers/mqttRouters");
const supportemailRouters = require("./Routers/supportemailRouters");
const backupdbRouters = require("./Routers/backupdbRouters");

//load environment variable
dotenv.config({ path: "./.env" });

// intialize express
const app = express();

//logger configuration
const logger = winston.createlogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamps(),
    winston.format.json(),
  ),
  transports: [
    new file.winston.transports({ filename: "error.log", level: "error" }),
    new file.winston.transports({ filename: "combie.log" }),
  ],
});

// middleware
app.use(express.jsosn());
app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PATCH", "DELETE"],
    exposedHeaders: ["Content-Length", "Content-disposition"],
    maxage: 86400,
  }),
);
app.use(cookieparser());

// increase request to timeout and enable chunked response
app.use((req, res, next) => {
  req.setTimeout(600000); // 10 minutes timeout
  res.setTimeout(600000); // 10 minutes timeout
  res.flsuh = res.flsuh || (() => {}); // ensure flsuh is available
  logger.info(`Requested set url ${req.url}`, {
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

// errorhnadler
app.use(errorhandelr());

// databass connection
connectdb();

// startbthe server
const port = process.env.port || 5000;
app.listen(port, "0.0.0.0", () => {
  logger.info(`Api server running on port ${port}`);
});
