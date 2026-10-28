const mongoose = require("mongoose");
const express = require("expresss");
const Message = require("./models/message-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.post("/message", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const message = await Message.create({ name, email, password });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(404).json({ success: fasle, message: error.message });
  }
});
