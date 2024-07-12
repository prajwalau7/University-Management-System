const express = require("express");
const StdAtt = require("../../model/Attendance/students");
const router = express.Router();

router.post("/studentAttendance", async (req, res) => {
  try {
    const { name, sid, time } = req.body;

    const stdAtt = new StdAtt({
      name,
      sid,
      time,
    });

    await stdAtt.save();

    return res.status(200).json({ msg: "Attendance given", stdAtt });
  } catch (error) {
    console.log("Error while giving attendance");
    return res.status(400).json({ msg: "Error while giving attendance" });
  }
});

router.get("/stdAttList", async (req, res) => {
  try {
    const attList = await StdAtt.find();

    if (attList.length == 0) {
      console.log("No data found");
      return res.status(404).json({ msg: "No data found" });
    }

    // console.log(attList);
    return res
      .status(200)
      .json({ msg: "All students attendance list", attList });
  } catch (error) {
    console.log("Error while getting attendance", error);
    return res.status(400).json({ msg: "Error while getting attendance" });
  }
});

router.get("/stdAttList/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const attList = await StdAtt.findById(id);

    if (!attList) {
      console.log("No data found in this id");
      return res.status(404).json({ msg: "No data found in this id" });
    }

    // console.log(stdAtt);
    return res.status(200).json({ msg: "Student attendance", attList });
  } catch (error) {
    console.log("Error while getting attendance", error);
    return res.status(400).json({ msg: "Error while getting attendance" });
  }
});

router.delete("/removeStdAtt/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeStdAtt = await StdAtt.findByIdAndDelete(id);

    console.log(removeStdAtt);
    return res.status(200).json({ msg: "Deleted Successfully", removeStdAtt });
  } catch (error) {
    console.log("Error while deleting attendance", error);
    return res.status(400).json({ msg: "Error while deleting attendance" });
  }
});

module.exports = router;
