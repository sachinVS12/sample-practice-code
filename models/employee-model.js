const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchmea = new mongoose.Schema(
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

// pre-save middleware hash password before save database
managerSchmea.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});
//  method to verify jwt token and signedup and loggedin
managerSchmea.methods.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      phonenumber: this.phonenumber,
      role: this.role,
      assignedigitlameter: this.assigneddigitalmeters,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword into exitsing password
managerSchmea.methods.verifypass = async function (enterpassword) {
  return await bcryptjs.compare(this.password, enterpassword);
};

// create the  model
const manager = mongoose.model("manager", managerSchmea);

// exports module
exports.moduel = manager;
