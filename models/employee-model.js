const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user-model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = await user.generateToken;
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.use("/signin", async (req, res) => {
  try {
    const { email, password } = req.params;
    const user = await user.finOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "email is not registered" });
    }
    const validate = await user.verifypass(password);
    if (!validate) {
      res
        .status(400)
        .json({ success: false, message: "password is not validate" });
    }
    const token = await user.generateToken();
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/sachin")
  .then(() => {
    console.log("Database connection successful!");
    app.listen(port, () => {
      console.log("litsing on port number 8000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
