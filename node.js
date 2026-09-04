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

// server.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await user.generateToken();
    res.status(200).json({ succes: true, token });
  } catch (error) {
    res.status(404).json({ success: fasle, message: error.message });
  }
});

app.use("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "email is not registered" });
    }
    const validate = await user.verifypass(password);
    if (!validate) {
      res.status(400).json({ succes: false, message: "password not valid" });
    }
    const token = await user.generateToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/sachin")
  .then(() => {
    console.log("Database connection successful!");
    app.listen(8000, () => {
      console.log("Listing on port number 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
