const mongoose = require("mongoose");

const teacherAttendance = new mongoose.Schema({
  name: { type: String, maxlength: 50, required: true },
  tid: { type: Number, required: true, unique: true },
  time: { type: Date, default: Date.now },
});

const TeacAtt = mongoose.model(
  "TeacherAtt",
  teacherAttendance,
  "TeacherAttendance"
);

module.exports = TeacAtt;
