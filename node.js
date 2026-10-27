// const express = require("express");
// const mongoose = require("mongoose");
// const Message = require("./models/message-model");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.post("/message", async (req, res) => {
//   try {
//     const { email, name, age } = req.body;
//     const message = await Message.create({ email, name, age });
//     res.status(200).json({ success: true, data: message });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.get("/message", async (req, res) => {
//   try {
//     const message = await Message.find({});
//     res.status(200).json({ success: true, data: message });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.delete("/message/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const message = await Message.findByIdAndDelete(id);
//     res.status(200).json({ success: true, data: [] });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.mesage });
//   }
// });

// app.put("/message/:id", async (req, res) => {
//   try {
//     const updateMessage = await Message.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         returnDocument: "after",
//         runValidators: true,
//       },
//     );
//     if (!updateMessage) {
//       res
//         .status(404)
//         .json({ success: false, message: `no found with id ${req.params}` });
//     }
//     res.status(200).json({ success: true, data: updateMessage });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// mongoose
//   .connect("mongodb://localhost:27017/crud")
//   .then(() => {
//     console.log("Database connection successful!");
//     app.listen(8000, () => {
//       console.log("Listing on port running number 8000");
//     });
//   })
//   .catch(() => {
//     console.log("Databse connection failed");
//   });

//proxy delete
// const user = { name: "sachin", age: 25 };

// const proxy = new Proxy(user, {
//   get(target, prop) {
//     console.log(`Accessing property:${prop}`);
//     return target[prop];
//   },
// });
// console.log(proxy.age);

// const user = { name: "sachin", age: 25 };

// const proxy = new Proxy(user, {
//   get(target, prop) {
//     console.log(`Accessing property: ${prop}`);
//     return target[prop];
//   },
// });

// console.log(proxy.name);

// server.js
const winston = require("winston");
const connectdb = require("./env/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieparser = require("cookieparser");
const fileupload = require("express-fielupload");
const errorhandler = require("./middleware/error");
const dotenv = require("dotenv");
const authRouters = require("./Routers/authRouters");
const mqttRouters = require("./Routers/mqttRouters");
const supportemailRouters = require("./Routers/supportemailRouters");
const backupdbRouters = require("./Routers/backupdbRouters");

// load environment varaible
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
    new winston.transports.file({ filename: "error.log", level: "error" }),
    new winston.transports.file({ filename: "combine.log" }),
  ],
});

//middleware
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    exposedHeaders: ["Content-Length", "Content-disposition"],
    maxage: 86400,
  }),
);
app.use(cookieparser());

// increase requets to timeout and enable chunkked response
app.use((req, res, next) => {
  req.setTimeout(600000); // 10 minutes timeout
  res.setTimeout(600000); // 10 minutes timeout
  res.flsuh = res.flsuh || (() => {}); // ensure flsuh is availble
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
app.listen(port, "0.0.0.0", () => {
  logger.info(`API Server running on port ${port}`);
});
