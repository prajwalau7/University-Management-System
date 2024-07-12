const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 100;
app.use(express.json());

const StdAtt = require("./controller/Attendance/students");
app.use(StdAtt);

const TeacAtt = require("./controller/Attendance/teachers");
app.use(TeacAtt);

const StdApp = require("./controller/Applications/students");
app.use(StdApp);

const TeacApp = require("./controller/Applications/teachers");
app.use(TeacApp);

mongoose
  .connect("mongodb://localhost/University")
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("Error while connecting to db", err));

app.get("/", (req, res) => {
  res.send("You are in the home page");
});

app.listen(port, () => {
  console.log(`Server listening on port number ${port}`);
});
