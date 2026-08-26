const mongoose = require("mongoose");

const messageSchmea = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    name: String,
    age: String,
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchmea);

module.exports = Message;
