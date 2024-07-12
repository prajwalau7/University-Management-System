const mongoose = require("mongoose");

const studentApplication = new mongoose.Schema({
  name: { type: String, maxlength: 50, required: true },
  email: {
    type: String,
    maxlength: 40,
    unique: true,
    lowercase: true,
    match: [/^[a-z0-9.]+@[a-z0-9.]+\.(com|in)$/, "Invalid email address"],
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    minlength: 10,
    required: true,
    unique: true,
    match: [
      /^[0-9]{10}$/,
      "phone should contain numbers and length should be 10",
    ],
  },
  address: {
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  course: { type: String, enum: ["BSc", "B.Com", "BA"], required: true },
});

const StdApp = mongoose.model(
  "StudentApp",
  studentApplication,
  "StudentApplication"
);

module.exports = StdApp;
