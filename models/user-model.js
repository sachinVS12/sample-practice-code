const mongoose = require("mongoose");
const bcrytpjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  },
);

// pre-save middleware hash password before save database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    //return next();
  }
  const salt = await bcrytpjs.genSalt(10);
  this.password = await bcrytpjs.hash(this.password, salt);
  //next();
});

// method to verify jwt token signup and signin
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this.id }, "X-auth-token", {
    expiresIn: "3d",
  });
};

// method to enterpassword into existing password
userSchema.methods.verifypass = async function (enterpassword) {
  return await bcrytpjs.compare(enterpassword, this.password);
};

// create the model
const User = mongoose.model("User", userSchema);

// exports module
module.exports = User;
