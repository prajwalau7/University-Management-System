const express = require("express");
const StdApp = require("../../model/Applications/students");
const router = express.Router();

router.post("/stdNewApp", async (req, res) => {
  const { name, email, phone, address, course } = req.body;

  try {
    const stdApp = new StdApp({
      name,
      email,
      phone,
      address,
      course,
    });

    await stdApp.save();
    return res.status(201).json({ msg: "Application sent", stdApp });
  } catch (error) {
    console.log("Error while post", error);
    return res.status(400).json({ msg: "Error while post" });
  }
});

router.get("/stdApp", async (req, res) => {
  try {
    const stdApp = await StdApp.find();

    if (stdApp.length == 0) {
      console.log("No data found");
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json({ msg: "Student Applications", stdApp });
  } catch (error) {
    console.log("Error while fetching applications", error);
    return res.status(404).json({ msg: "Error while fetching applications" });
  }
});

router.get("/stdApp/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const stdApp = await StdApp.findById(id);

    if (!stdApp) {
      console.log("No data found in this id");
      return res.status(404).json({ msg: "No data found in this id" });
    }

    return res.status(200).json({ msg: "Student Application", stdApp });
  } catch (error) {
    console.log("Error while fetching applications", error);
    return res.status(404).json({ msg: "Error while fetching applications" });
  }
});

router.put("/stdAppUpdate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const stdApp = await StdApp.findByIdAndUpdate(id, req.body, { new: true });

    if (!stdApp) {
      console.log(`No student application found in this id : ${id}`);
      return res
        .status(404)
        .json({ msg: "No student application found in this id" });
    }

    return res.status(200).json({ msg: "Updated successfully", stdApp });
  } catch (error) {
    console.log("Error while updating applications", error);
    return res.status(500).json({ msg: "Error while updating applications" });
  }
});

router.delete("/stdAppDelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const stdApp = await StdApp.findByIdAndDelete(id);

    if (!stdApp) {
      console.log(`No student application found in this id ${id}`);
      return res.status(404).json({ msg: `No student found in this id` });
    }

    return res.status(200).json({ msg: "Deleted successfully", stdApp });
  } catch (error) {
    console.log("Error while updating applications", error);
    return res.status(500).json({ msg: "Error while updating applications" });
  }
});

module.exports = router;
