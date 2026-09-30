// Reverse a String

// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// console.log(reverseString("hello"));
// olleh

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

// crud operation
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user-model");
const Message = require("./models/message-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/message", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const message = await Message.create({ name, email, password });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
