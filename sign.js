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

app.put("/message/:id", async (req, res) => {
  try {
    const updateMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updateMessage) {
      res
        .status(404)
        .json({ success: false, message: `no found with id ${req.params}` });
    }
    res.status(200).json({ success: true, data: updateMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("Database connection successful!");
    app.listen(8000, () => {
      console.log("Listening on port number 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
