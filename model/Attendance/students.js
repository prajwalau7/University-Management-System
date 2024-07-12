const mongoose = require("mongoose");

const studentAttendance = new mongoose.Schema({
  name: { type: String, maxlength: 50, required: true },
  sid: { type: Number, required: true, unique: true },
  time: { type: Date, default: Date.now },
});

const StdAtt = mongoose.model(
  "StudentAtt",
  studentAttendance,
  "StudentAttendance"
);

//console.log

module.exports = StdAtt;
