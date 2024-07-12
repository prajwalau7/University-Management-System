const express = require("express");
const TeacAtt = require("../../model/Attendance/teachers");
const router = express.Router();

router.post("/teacherAttendance", async (req, res) => {
  try {
    const { name, tid, time } = req.body;

    const teacAtt = new TeacAtt({
      name,
      tid,
      time,
    });

    await teacAtt.save();
    return res.status(200).json({ msg: "Attendance given", teacAtt });
  } catch (error) {
    console.log("Error while giving attendance", error);
    return res.status(400).json({ msg: "Error while giving attendance" });
  }
});

router.get("/teacAttList", async (req, res) => {
  try {
    const attList = await TeacAtt.find();

    if (attList.length == 0) {
      console.log("No data found");
      return res.status(404).json({ msg: "No data found" });
    }

    // console.log(attList);
    return res
      .status(200)
      .json({ msg: "All Teachers attendance list", attList });
  } catch (error) {
    console.log("Error while getting attendance", error);
    return res.status(400).json({ msg: "Error while getting attendance" });
  }
});

router.get("/teacAttList/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const attList = await TeacAtt.findById(id);

    if (!attList) {
      console.log("No data found on this id");
      return res.status(404).json({ msg: "No data found on this id" });
    }

    // console.log(attList);
    return res.status(200).json({ msg: "Teacher Attendance", attList });
  } catch (error) {
    console.log("Error while getting attendance", error);
    return res.status(400).json({ msg: "Error while getting attendance" });
  }
});

router.delete("/removeTeacAtt/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removeTeacAtt = await TeacAtt.findByIdAndDelete(id);

    if (!removeTeacAtt) {
      console.log("No data on this id");
      return res.status(404).json({ msg: "No data on this id" });
    }

    console.log(removeTeacAtt);
    return res.status(200).json({ msg: "Deleted Successfully", removeTeacAtt });
  } catch (error) {
    console.log("Error while deleting attendance", error);
    return res.status(400).json({ msg: "Error while deleting attendance" });
  }
});

module.exports = router;
