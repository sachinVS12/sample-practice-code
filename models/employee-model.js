const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
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
      unique: true,
    },
    phonenumber: {
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
    password: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      required: true,
    },
    assignedigtalmeters: {
      type: [
        {
          topics: String,
          metertype: String,
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

//pre-save middleware  hash password before save database
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcryptjs.gensalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// method to verify jwt token signedup and loggedin
employeeSchema.methods.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      role: this.role,
      assignedigtalmeters: this.assignedigtalmeters,
    },
    process.env.jwt_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword into exising password
employeeSchema.method.verifypass = async function (enterpassword) {
  return await bcryptjs.compare(enterpassword, this.password);
};

// create model
const employee = mongoose.model("employee", employeeSchema);

// exports module
exports.model = employee;
