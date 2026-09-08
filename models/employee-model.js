const mongoose = require("mongoose");
const bcrytpjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    favorates: {
      type: String,
      required: true,
    },
    graphwl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      default: "layout",
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
      default: "employee",
    },
  },
  {
    timestamps: true,
  },
);

// pre- save middleware hash password before save database
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrytpjs.genSalt(10);
  this.password = await bcrytpjs.hash(this.password, salt);
  next();
});

// method to verify jwt token signedup and loggedin
employeeSchema.method.getToken = function () {
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
employeeSchema.method.verifypass = async function (enterpassword) {
  return await bcrytpjs.compare(enterpassword, this.password);
};

// create the model
const employee = mongoose.model("employee", employeeSchema);

// exports module
exports.module = employee;
