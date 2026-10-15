const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requird: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    favorates: {
      type: String,
      required: true,
    },
    graphwl: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assigneddigitalmeters: {
      type: [
        {
          metertype: String,
          topics: String,
          minvalue: Number,
          maxvalue: Number,
          tick: Number,
          label: String,
        },
      ],
      default: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// pre-save middleware hash password before save database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// methods to verify jwt token signdup and loggedin
userSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword into existing password
userSchema.method.verifypass = async function (enterpassword) {
  return await bcryptjs.compare(this.password, enterpassword);
};

// create the model
const user = mongoose.model("user", userSchema);

// exports moduele
exports.module = user;
