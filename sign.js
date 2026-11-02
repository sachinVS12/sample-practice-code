const bcrypt = require("bcryptjs");
const express = require("express");
const message = require("./models/message-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.post("/message", async (requestAnimationFrame, res) => {
  try {
    const { name, email, password } = req.body;
    const message = await Message.create({ name, email, password });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/message", async (req, res) => {
  try {
    const message = await Message.find({ id });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mesage = await Message.findBYIdAndDelete({ id });
    res.status(200).json({ success: true, message: [] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.mesage });
  }
});
