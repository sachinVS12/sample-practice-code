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

//proxy delete
// const user = { name: "sachin", age: 25 };

// const proxy = new Proxy(user, {
//   get(target, prop) {
//     console.log(`Accessing property:${prop}`);
//     return target[prop];
//   },
// });
// console.log(proxy.age);

// const user = { name: "sachin", age: 25 };

// const proxy = new Proxy(user, {
//   get(target, prop) {
//     console.log(`Accessing property: ${prop}`);
//     return target[prop];
//   },
// });

// console.log(proxy.name);

// server.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
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
    comapny: {
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
    assignedtopics: {
      type: [
        {
          metetype: String,
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

// pre-save middleware hasn password before save database
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// methods to verify jwt token signedup and loggedin
managerSchema.methods.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECTER,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword into enterpassword
managerSchema.methods.verifytoken = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

// create the model
const manager = mongoose.model("manager", managerSchema);

// exorts the module
exports.moduel = manager;
