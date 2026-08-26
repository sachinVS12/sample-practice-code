const express = require("express");
const mongoose = require("mongoose");
const Message = require("./models/message-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/message", async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const message = await Message.create({ email, name, age });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/message", async (req, res) => {
  try {
    const message = await Message.find({});
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    res.status(201).json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/message/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: `no fuond with ${req.params.id}` });
    }
    const updatedMessage = await Message.findById(req.params.id);
    res.status(201).json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// app.put("/message/:id", async (req, res) => {
//   try {
//     const updatedMessage = await Message.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         returnDocument: "after",
//         runValidators: true,
//       },
//     );

//     if (!updatedMessage) {
//       return res.status(404).json({
//         success: false,
//         message: `No resource found with id ${req.params.id}`,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: updatedMessage,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("Database connection successful!");
    app.listen(8000, () => {
      console.log("listening on running port number 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
