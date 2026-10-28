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

app.get("/message", async (req, res, next) => {
  try {
    const message = await Message.find({});
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/message/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    res.status(201).json({ success: true, data: [] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
