const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoenumber: {
      type: String,
      required: false,
    },
    topics: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
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
    assignedigitalmeters: {
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
      requirefd: "employee",
    },
  },
  {
    timestamps: true,
  },
);

// pre-save middleware hash password befroe save database
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// methods to verify jwt token signedu and loggedin
managerSchema.methods.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      phonenumber: this.phoenumber,
      role: this.role,
      assignedigitalmeters: this.assignedigitalmeters,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword into existing password
managerSchema.methods.verifypass = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

// create model
const manager = mongoose.model("manager", managerSchema);

// exports module
exports.module = manager;
