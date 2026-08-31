// const express = require("express");
// const mongoose = require("mongoose");
// const User = require("./models/user-model");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     const token = await user.generateToken();
//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

// app.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email is registered" });
//     }
//     const validate = await user.verifypass(password);
//     if (!validate) {
//       res
//         .status(400)
//         .json({ success: false, message: "password is not valid" });
//     }
//     const token = await user.generateToken();
//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     res.status(400).json({ success: fasle, message: error.message });
//   }
// });

// mongoose
//   .connect("mongodb://localhost:27017/sachin")
//   .then(() => {
//     console.log("Database connection successful!");
//     app.listen(8000, () => {
//       console.log("Listining on port number 8000");
//     });
//   })
//   .catch(() => {
//     consloe.log("Database connection failed");
//   });

// server.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user-model");
const { token } = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await user.generateToken();
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/signin", async (req, res) => {
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
      res
        .status(404)
        .json({ success: false, message: "password is not  valid" });
    }
    const token = await user.generateToken();
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: true, message: ereor.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/sachin")
  .then(() => {
    console.log("Database connection successful!");
    app.listen(8000, () => {
      console.log("listining on port number 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
