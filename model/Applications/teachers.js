const mongoose = require("mongoose");

const teacherApplication = new mongoose.Schema({
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
    maxlength: 10,
    required: true,
    unique: true,
    match: [
      /^[0-9]{10}$/,
      "Phone should contain numbers and length should be 10",
    ],
  },
  address: {
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  subject: {
    type: String,
    enum: [
      "Mathematics",
      "Computers",
      "History",
      "Physics",
      "Economics",
      "Accountancy",
    ],
    required: true,
  },
});

const TeacApp = mongoose.model(
  "TeacherApp",
  teacherApplication,
  "TeacherApplication"
);

module.exports = TeacApp;
